import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FirebaseService } from '../database/firebase.service';
import {
  AssignmentStatus,
  SkipReason,
  LearningPath,
  DailyAssignment,
  TodayLessonResponse,
  LessonPreview,
  UpcomingLesson,
  UpcomingLessonsResponse,
  SkipLessonResponse,
  SkipLessonDto,
  LessonSelectionCriteria,
  ScoredLesson,
  SchedulingResult,
  LessonSchedulingPreferences,
  UpdatePreferencesDto,
} from './dto';
import { Difficulty } from '../cms/dto/lesson.dto';
import { TopicCategory } from '../cms/dto/topic.dto';

@Injectable()
export class LessonSchedulerService {
  private readonly logger = new Logger(LessonSchedulerService.name);

  constructor(private firebaseService: FirebaseService) {}

  // ==================== CRON JOB ====================

  /**
   * Daily cron job to assign lessons to all active users
   * Runs at midnight UTC - users will get lessons based on their timezone
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async assignDailyLessons(): Promise<void> {
    this.logger.log('Starting daily lesson assignment...');

    const db = this.firebaseService.getFirestore();
    const today = this.getTodayDateString();

    try {
      // Get all active users who have completed onboarding
      const usersSnapshot = await db.collection('profiles')
        .where('onboardingCompleted', '==', true)
        .get();

      let assignedCount = 0;
      let skippedCount = 0;

      for (const userDoc of usersSnapshot.docs) {
        const userId = userDoc.id;

        try {
          // Check if user already has an assignment for today
          const existingAssignment = await this.getAssignmentForDate(userId, today);
          if (existingAssignment) {
            skippedCount++;
            continue;
          }

          // Get user preferences
          const preferences = await this.getUserPreferences(userId);

          // Check if it's a weekend and user has weekends disabled
          const dayOfWeek = new Date().getDay();
          if ((dayOfWeek === 0 || dayOfWeek === 6) && !preferences.weekendsEnabled) {
            skippedCount++;
            continue;
          }

          // Select and assign lesson
          const userData = userDoc.data();
          const result = await this.selectLessonForUser(userId, userData.learningGoals || []);

          if (result.selectedLessonId) {
            await this.createAssignment(userId, result.selectedLessonId, today);
            assignedCount++;

            // Queue push notification (placeholder - implement with FCM)
            await this.queuePushNotification(userId, result.selectedLessonId);
          }
        } catch (error) {
          this.logger.error(`Failed to assign lesson for user ${userId}:`, error);
        }
      }

      this.logger.log(`Daily assignment complete. Assigned: ${assignedCount}, Skipped: ${skippedCount}`);
    } catch (error) {
      this.logger.error('Failed to run daily lesson assignment:', error);
    }
  }

  // ==================== PUBLIC METHODS ====================

  /**
   * Get today's assigned lesson for a user
   */
  async getTodayLesson(userId: string): Promise<TodayLessonResponse> {
    const db = this.firebaseService.getFirestore();
    const today = this.getTodayDateString();

    // Get or create today's assignment
    let assignment = await this.getAssignmentForDate(userId, today);

    // If no assignment exists, create one on-demand
    if (!assignment) {
      const userDoc = await db.collection('profiles').doc(userId).get();
      const userData = userDoc.data() || {};
      const learningGoals = userData.learningGoals || [];

      const result = await this.selectLessonForUser(userId, learningGoals);

      if (result.selectedLessonId) {
        assignment = await this.createAssignment(userId, result.selectedLessonId, today);
      }
    }

    // Get lesson details if assigned
    let lesson: LessonPreview | null = null;
    if (assignment) {
      lesson = await this.getLessonPreview(assignment.lessonId);
    }

    // Get user's streak info
    const statsDoc = await db.collection('userStatistics').doc(userId).get();
    const stats = statsDoc.data() || {};
    const streakDays = stats.currentStreak || 0;

    // Check if streak is at risk (no lesson completed today)
    const completedToday = assignment?.status === AssignmentStatus.COMPLETED;
    const streakAtRisk = streakDays > 0 && !completedToday;

    // Generate appropriate message
    let message = 'Your daily lesson is ready!';
    if (!assignment) {
      message = 'No lessons available. Check back soon!';
    } else if (assignment.status === AssignmentStatus.COMPLETED) {
      message = 'Great job! You completed today\'s lesson.';
    } else if (assignment.status === AssignmentStatus.SKIPPED) {
      message = 'You skipped today\'s lesson.';
    } else if (streakAtRisk) {
      message = `Complete your lesson to maintain your ${streakDays}-day streak!`;
    }

    return {
      assignment,
      lesson,
      isAssigned: !!assignment,
      message,
      streakDays,
      streakAtRisk,
    };
  }

  /**
   * Get upcoming lessons for the next 7 days
   */
  async getUpcomingLessons(userId: string): Promise<UpcomingLessonsResponse> {
    const db = this.firebaseService.getFirestore();
    const today = await this.getTodayLesson(userId);

    const upcoming: UpcomingLesson[] = [];
    const preferences = await this.getUserPreferences(userId);

    // Get user data for lesson selection
    const userDoc = await db.collection('profiles').doc(userId).get();
    const userData = userDoc.data() || {};
    const learningGoals = userData.learningGoals || [];

    // Generate preview for next 7 days
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dateString = this.formatDateString(date);
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

      // Check if weekend and weekends disabled
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      if (isWeekend && !preferences.weekendsEnabled) {
        upcoming.push({
          date: dateString,
          dayOfWeek,
          lesson: null,
          isAssigned: false,
          isPast: false,
        });
        continue;
      }

      // Check for existing assignment
      const existingAssignment = await this.getAssignmentForDate(userId, dateString);

      if (existingAssignment) {
        const lesson = await this.getLessonPreview(existingAssignment.lessonId);
        upcoming.push({
          date: dateString,
          dayOfWeek,
          lesson,
          isAssigned: true,
          isPast: false,
        });
      } else {
        // Preview what lesson would be assigned (don't actually assign)
        const result = await this.selectLessonForUser(userId, learningGoals, i);
        let lesson: LessonPreview | null = null;
        if (result.selectedLessonId) {
          lesson = await this.getLessonPreview(result.selectedLessonId);
        }

        upcoming.push({
          date: dateString,
          dayOfWeek,
          lesson,
          isAssigned: false,
          isPast: false,
        });
      }
    }

    // Determine recommended learning path
    const recommendedPath = this.determineRecommendedPath(learningGoals);

    return {
      today,
      upcoming,
      totalPlannedLessons: upcoming.filter(u => u.lesson !== null).length + (today.lesson ? 1 : 0),
      recommendedPath,
    };
  }

  /**
   * Skip today's lesson with a reason
   */
  async skipLesson(userId: string, dto: SkipLessonDto): Promise<SkipLessonResponse> {
    const db = this.firebaseService.getFirestore();
    const today = this.getTodayDateString();

    // Get today's assignment
    const assignment = await this.getAssignmentForDate(userId, today);

    if (!assignment) {
      throw new NotFoundException('No lesson assigned for today');
    }

    if (assignment.status === AssignmentStatus.COMPLETED) {
      throw new NotFoundException('Cannot skip a completed lesson');
    }

    if (assignment.status === AssignmentStatus.SKIPPED) {
      throw new NotFoundException('Lesson already skipped');
    }

    // Update assignment to skipped
    const assignmentRef = db.collection('dailyAssignments').doc(assignment.id);
    await assignmentRef.update({
      status: AssignmentStatus.SKIPPED,
      skippedAt: new Date().toISOString(),
      skipReason: dto.reason,
      skipFeedback: dto.feedback || null,
    });

    // Count skips this week
    const weekStart = this.getWeekStartDate();
    const skipsSnapshot = await db.collection('dailyAssignments')
      .where('userId', '==', userId)
      .where('status', '==', AssignmentStatus.SKIPPED)
      .where('assignedDate', '>=', weekStart)
      .get();

    const totalSkipsThisWeek = skipsSnapshot.size;

    // Get user's streak - skipping doesn't break streak immediately
    const statsDoc = await db.collection('userStatistics').doc(userId).get();
    const stats = statsDoc.data() || {};
    const streakMaintained = true; // Streak is maintained until end of day

    // Select next lesson as alternative
    const userDoc = await db.collection('profiles').doc(userId).get();
    const userData = userDoc.data() || {};
    const result = await this.selectLessonForUser(userId, userData.learningGoals || [], 1);

    let nextLesson: LessonPreview | null = null;
    if (result.selectedLessonId) {
      nextLesson = await this.getLessonPreview(result.selectedLessonId);
    }

    return {
      success: true,
      message: 'Lesson skipped. Your streak will be maintained if you complete tomorrow\'s lesson.',
      skippedLessonId: assignment.lessonId,
      nextLesson,
      streakMaintained,
      totalSkipsThisWeek,
    };
  }

  /**
   * Get or create user scheduling preferences
   */
  async getUserPreferences(userId: string): Promise<LessonSchedulingPreferences> {
    const db = this.firebaseService.getFirestore();

    const prefsDoc = await db.collection('schedulingPreferences').doc(userId).get();

    if (prefsDoc.exists) {
      return prefsDoc.data() as LessonSchedulingPreferences;
    }

    // Create default preferences
    const defaults: LessonSchedulingPreferences = {
      userId,
      learningPath: LearningPath.BALANCED,
      preferredDurationMinutes: 15,
      preferredTime: '09:00',
      timezone: 'UTC',
      notificationsEnabled: true,
      weekendsEnabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.collection('schedulingPreferences').doc(userId).set(defaults);
    return defaults;
  }

  /**
   * Update user scheduling preferences
   */
  async updateUserPreferences(userId: string, dto: UpdatePreferencesDto): Promise<LessonSchedulingPreferences> {
    const db = this.firebaseService.getFirestore();

    const updateData: Record<string, any> = {
      updatedAt: new Date().toISOString(),
    };

    if (dto.learningPath !== undefined) updateData.learningPath = dto.learningPath;
    if (dto.preferredDurationMinutes !== undefined) updateData.preferredDurationMinutes = dto.preferredDurationMinutes;
    if (dto.preferredTime !== undefined) updateData.preferredTime = dto.preferredTime;
    if (dto.timezone !== undefined) updateData.timezone = dto.timezone;
    if (dto.notificationsEnabled !== undefined) updateData.notificationsEnabled = dto.notificationsEnabled;
    if (dto.weekendsEnabled !== undefined) updateData.weekendsEnabled = dto.weekendsEnabled;

    await db.collection('schedulingPreferences').doc(userId).set(updateData, { merge: true });

    return this.getUserPreferences(userId);
  }

  /**
   * Manually trigger lesson assignment for a user (admin/testing)
   */
  async assignLessonNow(userId: string): Promise<TodayLessonResponse> {
    const db = this.firebaseService.getFirestore();
    const today = this.getTodayDateString();

    // Delete existing assignment if any
    const existing = await this.getAssignmentForDate(userId, today);
    if (existing) {
      await db.collection('dailyAssignments').doc(existing.id).delete();
    }

    // Get user data
    const userDoc = await db.collection('profiles').doc(userId).get();
    const userData = userDoc.data() || {};

    // Select and assign new lesson
    const result = await this.selectLessonForUser(userId, userData.learningGoals || []);

    if (result.selectedLessonId) {
      await this.createAssignment(userId, result.selectedLessonId, today);
    }

    return this.getTodayLesson(userId);
  }

  // ==================== LESSON SELECTION ALGORITHM ====================

  /**
   * Select the best lesson for a user based on multiple factors
   */
  private async selectLessonForUser(
    userId: string,
    learningGoals: string[],
    daysAhead: number = 0
  ): Promise<SchedulingResult> {
    const db = this.firebaseService.getFirestore();

    // Get user's completed and skipped lessons
    const progressSnapshot = await db.collection('userLessons')
      .where('userId', '==', userId)
      .get();

    const completedLessonIds: string[] = [];
    const skippedLessonIds: string[] = [];

    progressSnapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.status === 'completed') {
        completedLessonIds.push(data.lessonId);
      }
    });

    // Get skipped lessons from assignments
    const skippedSnapshot = await db.collection('dailyAssignments')
      .where('userId', '==', userId)
      .where('status', '==', AssignmentStatus.SKIPPED)
      .get();

    skippedSnapshot.docs.forEach(doc => {
      skippedLessonIds.push(doc.data().lessonId);
    });

    // Get user preferences
    const preferences = await this.getUserPreferences(userId);

    // Determine current difficulty level based on progress
    const currentDifficulty = this.determineCurrentDifficulty(completedLessonIds.length);

    // Map learning goals to preferred categories
    const preferredCategories = this.mapGoalsToCategories(learningGoals, preferences.learningPath);

    // Build selection criteria
    const criteria: LessonSelectionCriteria = {
      userId,
      learningGoals,
      completedLessonIds,
      skippedLessonIds,
      currentDifficulty,
      preferredCategories,
      preferredDuration: preferences.preferredDurationMinutes,
    };

    // Get all published lessons
    const lessonsSnapshot = await db.collection('lessons')
      .where('isPublished', '==', true)
      .get();

    const allLessons = lessonsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Score each lesson
    const scoredLessons: ScoredLesson[] = allLessons.map(lesson => {
      const { score, reasons } = this.scoreLessonForUser(lesson, criteria, daysAhead);
      return { lessonId: lesson.id, score, reasons };
    });

    // Sort by score (highest first)
    scoredLessons.sort((a, b) => b.score - a.score);

    // Handle edge cases
    if (scoredLessons.length === 0) {
      return {
        selectedLessonId: null,
        alternativeLessonIds: [],
        reason: 'No lessons available',
        isReview: false,
      };
    }

    // Check if all lessons are completed
    const allCompleted = scoredLessons.every(l => completedLessonIds.includes(l.lessonId));
    if (allCompleted) {
      // Recommend review - pick oldest completed lesson
      const oldestCompleted = await this.getOldestCompletedLesson(userId);
      return {
        selectedLessonId: oldestCompleted || scoredLessons[0].lessonId,
        alternativeLessonIds: scoredLessons.slice(1, 4).map(l => l.lessonId),
        reason: 'Review recommended - all lessons completed',
        isReview: true,
      };
    }

    // Select the highest scored uncompleted lesson
    const selected = scoredLessons.find(l => !completedLessonIds.includes(l.lessonId));

    return {
      selectedLessonId: selected?.lessonId || scoredLessons[0].lessonId,
      alternativeLessonIds: scoredLessons.slice(1, 4).map(l => l.lessonId),
      reason: selected?.reasons.join(', ') || 'Best match',
      isReview: false,
    };
  }

  /**
   * Score a lesson for a specific user
   */
  private scoreLessonForUser(
    lesson: any,
    criteria: LessonSelectionCriteria,
    daysAhead: number
  ): { score: number; reasons: string[] } {
    let score = 100; // Start with base score
    const reasons: string[] = [];

    // Already completed - major penalty
    if (criteria.completedLessonIds.includes(lesson.id)) {
      score -= 80;
      reasons.push('Already completed');
    }

    // Recently skipped - moderate penalty
    if (criteria.skippedLessonIds.includes(lesson.id)) {
      score -= 40;
      reasons.push('Previously skipped');
    }

    // Category match bonus
    if (criteria.preferredCategories.includes(lesson.category)) {
      score += 30;
      reasons.push('Matches learning goals');
    }

    // Difficulty progression
    const difficultyScore = this.getDifficultyScore(lesson.difficulty, criteria.currentDifficulty);
    score += difficultyScore;
    if (difficultyScore > 0) {
      reasons.push('Appropriate difficulty');
    } else if (difficultyScore < -10) {
      reasons.push('May be too challenging');
    }

    // Duration match
    const durationDiff = Math.abs((lesson.durationMinutes || 15) - criteria.preferredDuration);
    if (durationDiff <= 5) {
      score += 15;
      reasons.push('Matches time preference');
    } else if (durationDiff > 15) {
      score -= 10;
    }

    // Order preference (earlier lessons first for new users)
    const orderBonus = Math.max(0, 20 - (lesson.order || 0) * 2);
    score += orderBonus;

    // Add variation for days ahead to avoid same sequence
    score += (daysAhead * 7) % 10;

    return { score, reasons };
  }

  /**
   * Get difficulty score based on progression
   */
  private getDifficultyScore(lessonDifficulty: string, currentLevel: string): number {
    const levels = { beginner: 0, intermediate: 1, advanced: 2 };
    const lessonLevel = levels[lessonDifficulty] ?? 0;
    const userLevel = levels[currentLevel] ?? 0;

    const diff = lessonLevel - userLevel;

    if (diff === 0) return 20; // Perfect match
    if (diff === 1) return 10; // Slight challenge (good)
    if (diff === -1) return 5; // Review (ok)
    if (diff >= 2) return -20; // Too hard
    return -10; // Too easy
  }

  /**
   * Determine user's current difficulty level based on completed lessons
   */
  private determineCurrentDifficulty(completedCount: number): string {
    if (completedCount < 5) return Difficulty.BEGINNER;
    if (completedCount < 15) return Difficulty.INTERMEDIATE;
    return Difficulty.ADVANCED;
  }

  /**
   * Map user goals to preferred categories
   */
  private mapGoalsToCategories(goals: string[], learningPath: LearningPath): string[] {
    const categories: string[] = [];

    // Map common goal keywords to categories
    const goalMapping: Record<string, string> = {
      'public speaking': TopicCategory.COMMUNICATION_SKILLS,
      'communication': TopicCategory.COMMUNICATION_SKILLS,
      'presentation': TopicCategory.COMMUNICATION_SKILLS,
      'confidence': TopicCategory.SELF_GROWTH,
      'leadership': TopicCategory.SELF_GROWTH,
      'emotional intelligence': TopicCategory.SELF_GROWTH,
      'knowledge': TopicCategory.KNOWLEDGE,
      'learning': TopicCategory.KNOWLEDGE,
    };

    goals.forEach(goal => {
      const lowerGoal = goal.toLowerCase();
      for (const [keyword, category] of Object.entries(goalMapping)) {
        if (lowerGoal.includes(keyword)) {
          if (!categories.includes(category)) {
            categories.push(category);
          }
        }
      }
    });

    // Add based on learning path preference
    switch (learningPath) {
      case LearningPath.COMMUNICATION_FOCUS:
        if (!categories.includes(TopicCategory.COMMUNICATION_SKILLS)) {
          categories.unshift(TopicCategory.COMMUNICATION_SKILLS);
        }
        break;
      case LearningPath.SELF_GROWTH_FOCUS:
        if (!categories.includes(TopicCategory.SELF_GROWTH)) {
          categories.unshift(TopicCategory.SELF_GROWTH);
        }
        break;
      case LearningPath.KNOWLEDGE_FOCUS:
        if (!categories.includes(TopicCategory.KNOWLEDGE)) {
          categories.unshift(TopicCategory.KNOWLEDGE);
        }
        break;
      case LearningPath.BALANCED:
      default:
        // Include all categories for balanced path
        [TopicCategory.COMMUNICATION_SKILLS, TopicCategory.SELF_GROWTH, TopicCategory.KNOWLEDGE]
          .forEach(cat => {
            if (!categories.includes(cat)) {
              categories.push(cat);
            }
          });
    }

    return categories;
  }

  /**
   * Determine recommended learning path based on goals
   */
  private determineRecommendedPath(goals: string[]): string {
    const communicationKeywords = ['speaking', 'communication', 'presentation', 'listening'];
    const growthKeywords = ['confidence', 'leadership', 'emotional', 'relationships'];

    let communicationScore = 0;
    let growthScore = 0;

    goals.forEach(goal => {
      const lower = goal.toLowerCase();
      communicationKeywords.forEach(k => {
        if (lower.includes(k)) communicationScore++;
      });
      growthKeywords.forEach(k => {
        if (lower.includes(k)) growthScore++;
      });
    });

    if (communicationScore > growthScore) {
      return 'Communication Skills Focus';
    } else if (growthScore > communicationScore) {
      return 'Self Growth Focus';
    }
    return 'Balanced Learning';
  }

  // ==================== HELPER METHODS ====================

  private async getAssignmentForDate(userId: string, date: string): Promise<DailyAssignment | null> {
    const db = this.firebaseService.getFirestore();

    const snapshot = await db.collection('dailyAssignments')
      .where('userId', '==', userId)
      .where('assignedDate', '==', date)
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as DailyAssignment;
  }

  private async createAssignment(userId: string, lessonId: string, date: string): Promise<DailyAssignment> {
    const db = this.firebaseService.getFirestore();
    const now = new Date().toISOString();

    // Set expiration to end of day
    const expiresAt = new Date(date);
    expiresAt.setHours(23, 59, 59, 999);

    const assignmentData = {
      userId,
      lessonId,
      assignedDate: date,
      status: AssignmentStatus.PENDING,
      assignedAt: now,
      startedAt: null,
      completedAt: null,
      skippedAt: null,
      skipReason: null,
      skipFeedback: null,
      expiresAt: expiresAt.toISOString(),
    };

    const docRef = await db.collection('dailyAssignments').add(assignmentData);

    return { id: docRef.id, ...assignmentData } as DailyAssignment;
  }

  private async getLessonPreview(lessonId: string): Promise<LessonPreview | null> {
    const db = this.firebaseService.getFirestore();

    const lessonDoc = await db.collection('lessons').doc(lessonId).get();

    if (!lessonDoc.exists) return null;

    const data = lessonDoc.data();
    return {
      id: lessonDoc.id,
      title: data?.title || '',
      description: data?.description || '',
      category: data?.category || '',
      difficulty: data?.difficulty || 'beginner',
      durationMinutes: data?.durationMinutes || 15,
      introductionContent: data?.introductionContent || null,
      learningObjectives: data?.learningObjectives || [],
    };
  }

  private async getOldestCompletedLesson(userId: string): Promise<string | null> {
    const db = this.firebaseService.getFirestore();

    const snapshot = await db.collection('userLessons')
      .where('userId', '==', userId)
      .where('status', '==', 'completed')
      .orderBy('completedAt', 'asc')
      .limit(1)
      .get();

    if (snapshot.empty) return null;
    return snapshot.docs[0].data().lessonId;
  }

  private async queuePushNotification(userId: string, lessonId: string): Promise<void> {
    // TODO: Implement with Firebase Cloud Messaging
    // For now, just log
    this.logger.debug(`Push notification queued for user ${userId}, lesson ${lessonId}`);

    const db = this.firebaseService.getFirestore();

    // Store notification in queue for processing
    await db.collection('notificationQueue').add({
      userId,
      lessonId,
      type: 'daily_lesson_ready',
      title: 'Your daily lesson is ready!',
      body: 'Start your 15-minute lesson now to continue your streak.',
      scheduledFor: new Date().toISOString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    });
  }

  private getTodayDateString(): string {
    return this.formatDateString(new Date());
  }

  private formatDateString(date: Date): string {
    return date.toISOString().split('T')[0]; // "2024-01-15"
  }

  private getWeekStartDate(): string {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(now.setDate(diff));
    return this.formatDateString(monday);
  }
}
