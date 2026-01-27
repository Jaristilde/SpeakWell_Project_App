import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { FirebaseService } from '../database/firebase.service';
import {
  LessonStatus,
  LessonSection,
  StartLessonDto,
  CompleteLessonDto,
  UpdateProgressDto,
  UserLessonProgressResponse,
  LessonWithProgressResponse,
  DailyLessonResponse,
  LessonCompletionResponse,
  UserLessonStatsResponse,
  CategoryProgressItem,
} from './dto';
import {
  TopicCategory,
  CATEGORY_METADATA,
  SUBCATEGORY_METADATA,
  CategoryResponse,
  SubCategoryInfo,
} from '../cms/dto/topic.dto';
import { LessonResponse, LessonExerciseType } from '../cms/dto/lesson.dto';

@Injectable()
export class LessonsService {
  constructor(private firebaseService: FirebaseService) {}

  // ==================== DAILY LESSON ====================

  /**
   * Get the user's daily recommended lesson
   * Algorithm: Find next uncompleted lesson based on user's progress
   */
  async getDailyLesson(userId: string): Promise<DailyLessonResponse> {
    const db = this.firebaseService.getFirestore();

    // Get user's completed lessons
    const completedSnapshot = await db.collection('userLessons')
      .where('userId', '==', userId)
      .where('status', '==', 'completed')
      .get();

    const completedLessonIds = new Set(
      completedSnapshot.docs.map(doc => doc.data().lessonId)
    );

    // Get all published lessons ordered by difficulty and order
    const lessonsSnapshot = await db.collection('lessons')
      .where('isPublished', '==', true)
      .orderBy('order', 'asc')
      .get();

    // Find next uncompleted lesson
    let dailyLesson: any = null;
    let isNewLesson = true;
    let recommendedReason = 'Next in your learning journey';

    // First, check for any in-progress lesson
    const inProgressSnapshot = await db.collection('userLessons')
      .where('userId', '==', userId)
      .where('status', '==', 'in_progress')
      .orderBy('lastAccessedAt', 'desc')
      .limit(1)
      .get();

    if (!inProgressSnapshot.empty) {
      const inProgressData = inProgressSnapshot.docs[0].data();
      const lessonDoc = await db.collection('lessons').doc(inProgressData.lessonId).get();
      if (lessonDoc.exists) {
        dailyLesson = { id: lessonDoc.id, ...lessonDoc.data() };
        isNewLesson = false;
        recommendedReason = 'Continue where you left off';
      }
    }

    // If no in-progress, find next uncompleted
    if (!dailyLesson) {
      for (const doc of lessonsSnapshot.docs) {
        if (!completedLessonIds.has(doc.id)) {
          dailyLesson = { id: doc.id, ...doc.data() };
          break;
        }
      }
    }

    // If all completed, recommend reviewing an older lesson
    if (!dailyLesson && lessonsSnapshot.docs.length > 0) {
      // Get oldest completed lesson for review
      const oldestCompletedSnapshot = await db.collection('userLessons')
        .where('userId', '==', userId)
        .where('status', '==', 'completed')
        .orderBy('completedAt', 'asc')
        .limit(1)
        .get();

      if (!oldestCompletedSnapshot.empty) {
        const oldestData = oldestCompletedSnapshot.docs[0].data();
        const lessonDoc = await db.collection('lessons').doc(oldestData.lessonId).get();
        if (lessonDoc.exists) {
          dailyLesson = { id: lessonDoc.id, ...lessonDoc.data() };
          isNewLesson = false;
          recommendedReason = 'Review this lesson to reinforce your learning';
        }
      }
    }

    if (!dailyLesson) {
      throw new NotFoundException('No lessons available');
    }

    // Get user's streak
    const statsDoc = await db.collection('userStatistics').doc(userId).get();
    const streakDays = statsDoc.exists ? (statsDoc.data()?.currentStreak || 0) : 0;

    // Get progress for this lesson
    const progressSnapshot = await db.collection('userLessons')
      .where('userId', '==', userId)
      .where('lessonId', '==', dailyLesson.id)
      .limit(1)
      .get();

    const progress = progressSnapshot.empty ? null : this.formatProgress(
      progressSnapshot.docs[0].id,
      progressSnapshot.docs[0].data()
    );

    return {
      lesson: {
        ...this.formatLessonFull(dailyLesson),
        progress,
        isCompleted: progress?.status === LessonStatus.COMPLETED,
        isStarted: progress !== null,
      },
      streakDays,
      isNewLesson,
      recommendedReason,
    };
  }

  // ==================== LESSON RETRIEVAL ====================

  async getAllLessons(): Promise<any[]> {
    const db = this.firebaseService.getFirestore();

    const snapshot = await db.collection('lessons')
      .where('isPublished', '==', true)
      .orderBy('order', 'asc')
      .get();

    return snapshot.docs.map(doc => this.formatLessonSummary({ id: doc.id, ...doc.data() }));
  }

  async getLessonById(id: string): Promise<LessonResponse> {
    const db = this.firebaseService.getFirestore();

    const lessonDoc = await db.collection('lessons').doc(id).get();

    if (!lessonDoc.exists) {
      throw new NotFoundException('Lesson not found');
    }

    return this.formatLessonFull({ id: lessonDoc.id, ...lessonDoc.data() });
  }

  async getUserLessons(userId: string): Promise<LessonWithProgressResponse[]> {
    const db = this.firebaseService.getFirestore();

    // Get all lessons
    const lessonsSnapshot = await db.collection('lessons')
      .where('isPublished', '==', true)
      .orderBy('order', 'asc')
      .get();

    // Get user's progress
    const progressSnapshot = await db.collection('userLessons')
      .where('userId', '==', userId)
      .get();

    const progressMap = new Map<string, any>();
    for (const doc of progressSnapshot.docs) {
      const data = doc.data();
      progressMap.set(data.lessonId, { id: doc.id, ...data });
    }

    return lessonsSnapshot.docs.map(doc => {
      const lesson = { id: doc.id, ...doc.data() };
      const progress = progressMap.get(doc.id);

      return {
        ...this.formatLessonSummary(lesson),
        progress: progress ? this.formatProgress(progress.id, progress) : null,
        isCompleted: progress?.status === 'completed',
        isStarted: progress !== undefined,
      };
    });
  }

  // ==================== LESSON PROGRESS ====================

  async startLesson(userId: string, lessonId: string, dto: StartLessonDto): Promise<UserLessonProgressResponse> {
    const db = this.firebaseService.getFirestore();

    // Verify lesson exists
    const lessonDoc = await db.collection('lessons').doc(lessonId).get();
    if (!lessonDoc.exists) {
      throw new NotFoundException('Lesson not found');
    }

    const now = new Date().toISOString();

    // Check if progress record exists
    const existingSnapshot = await db.collection('userLessons')
      .where('userId', '==', userId)
      .where('lessonId', '==', lessonId)
      .limit(1)
      .get();

    if (!existingSnapshot.empty) {
      // Update existing record
      const docRef = existingSnapshot.docs[0].ref;
      await docRef.update({
        status: LessonStatus.IN_PROGRESS,
        currentSection: LessonSection.INTRODUCTION,
        lastAccessedAt: now,
        deviceType: dto.deviceType || null,
      });

      const updated = await docRef.get();
      return this.formatProgress(updated.id, updated.data());
    }

    // Create new progress record
    const progressData = {
      userId,
      lessonId,
      status: LessonStatus.IN_PROGRESS,
      currentSection: LessonSection.INTRODUCTION,
      startedAt: now,
      completedAt: null,
      exerciseScore: null,
      exerciseAttempts: 0,
      practiceRecordingId: null,
      practiceCompleted: false,
      timeSpentSeconds: 0,
      lastAccessedAt: now,
      deviceType: dto.deviceType || null,
      createdAt: now,
    };

    const docRef = await db.collection('userLessons').add(progressData);

    return this.formatProgress(docRef.id, progressData);
  }

  async updateProgress(userId: string, lessonId: string, dto: UpdateProgressDto): Promise<UserLessonProgressResponse> {
    const db = this.firebaseService.getFirestore();

    const existingSnapshot = await db.collection('userLessons')
      .where('userId', '==', userId)
      .where('lessonId', '==', lessonId)
      .limit(1)
      .get();

    if (existingSnapshot.empty) {
      throw new NotFoundException('Lesson progress not found. Start the lesson first.');
    }

    const docRef = existingSnapshot.docs[0].ref;
    const updateData: Record<string, any> = {
      currentSection: dto.currentSection,
      timeSpentSeconds: dto.timeSpentSeconds,
      lastAccessedAt: new Date().toISOString(),
    };

    if (dto.exerciseScore !== undefined) {
      updateData.exerciseScore = dto.exerciseScore;
    }
    if (dto.exerciseAttempts !== undefined) {
      updateData.exerciseAttempts = dto.exerciseAttempts;
    }

    await docRef.update(updateData);

    const updated = await docRef.get();
    return this.formatProgress(updated.id, updated.data());
  }

  async completeLesson(userId: string, lessonId: string, dto?: CompleteLessonDto): Promise<LessonCompletionResponse> {
    const db = this.firebaseService.getFirestore();

    // Verify lesson exists
    const lessonDoc = await db.collection('lessons').doc(lessonId).get();
    if (!lessonDoc.exists) {
      throw new NotFoundException('Lesson not found');
    }

    const now = new Date().toISOString();
    const timeSpent = dto?.timeSpentSeconds || 0;

    // Check if progress record exists
    const existingSnapshot = await db.collection('userLessons')
      .where('userId', '==', userId)
      .where('lessonId', '==', lessonId)
      .limit(1)
      .get();

    let progressId: string;

    if (!existingSnapshot.empty) {
      // Update existing record
      const docRef = existingSnapshot.docs[0].ref;
      const existingData = existingSnapshot.docs[0].data();

      await docRef.update({
        status: LessonStatus.COMPLETED,
        currentSection: LessonSection.SUMMARY,
        completedAt: now,
        exerciseScore: dto?.exerciseScore ?? existingData.exerciseScore,
        practiceRecordingId: dto?.practiceRecordingId ?? existingData.practiceRecordingId,
        practiceCompleted: dto?.practiceRecordingId ? true : (dto?.skippedPractice ? false : existingData.practiceCompleted),
        timeSpentSeconds: timeSpent || existingData.timeSpentSeconds,
        lastAccessedAt: now,
        feedback: dto?.feedback || null,
      });

      progressId = existingSnapshot.docs[0].id;
    } else {
      // Create completed record directly
      const progressData = {
        userId,
        lessonId,
        status: LessonStatus.COMPLETED,
        currentSection: LessonSection.SUMMARY,
        startedAt: now,
        completedAt: now,
        exerciseScore: dto?.exerciseScore || null,
        exerciseAttempts: 1,
        practiceRecordingId: dto?.practiceRecordingId || null,
        practiceCompleted: !!dto?.practiceRecordingId,
        timeSpentSeconds: timeSpent,
        lastAccessedAt: now,
        deviceType: null,
        feedback: dto?.feedback || null,
        createdAt: now,
      };

      const docRef = await db.collection('userLessons').add(progressData);
      progressId = docRef.id;
    }

    // Update user statistics
    const stats = await this.updateStatistics(userId, timeSpent);

    return {
      success: true,
      lessonId,
      exerciseScore: dto?.exerciseScore || null,
      practiceRecordingId: dto?.practiceRecordingId || null,
      timeSpentSeconds: timeSpent,
      completedAt: now,
      totalLessonsCompleted: stats.lessonsCompleted,
      currentStreak: stats.currentStreak,
      totalPracticeMinutes: stats.totalPracticeMinutes,
    };
  }

  // ==================== CATEGORIES ====================

  async getCategories(): Promise<CategoryResponse[]> {
    const db = this.firebaseService.getFirestore();

    // Get topic counts per category
    const topicsSnapshot = await db.collection('topics')
      .where('isActive', '==', true)
      .get();

    const lessonSnapshot = await db.collection('lessons')
      .where('isPublished', '==', true)
      .get();

    // Count by category
    const topicCounts: Record<string, number> = {};
    const lessonCounts: Record<string, number> = {};

    topicsSnapshot.docs.forEach(doc => {
      const category = doc.data().category;
      if (category) {
        topicCounts[category] = (topicCounts[category] || 0) + 1;
      }
    });

    lessonSnapshot.docs.forEach(doc => {
      const category = doc.data().category;
      if (category) {
        lessonCounts[category] = (lessonCounts[category] || 0) + 1;
      }
    });

    // Build response
    const categories: CategoryResponse[] = Object.values(TopicCategory).map(category => {
      const metadata = CATEGORY_METADATA[category];
      const subCategories = this.getSubCategoriesForCategory(category);

      return {
        category,
        displayName: metadata.displayName,
        description: metadata.description,
        subCategories,
        topicCount: topicCounts[category] || 0,
        lessonCount: lessonCounts[category] || 0,
      };
    });

    return categories;
  }

  async getLessonsByCategory(category: string): Promise<any[]> {
    const db = this.firebaseService.getFirestore();

    const snapshot = await db.collection('lessons')
      .where('category', '==', category)
      .where('isPublished', '==', true)
      .orderBy('order', 'asc')
      .get();

    return snapshot.docs.map(doc => this.formatLessonSummary({ id: doc.id, ...doc.data() }));
  }

  // ==================== USER STATS ====================

  async getUserStats(userId: string): Promise<UserLessonStatsResponse> {
    const db = this.firebaseService.getFirestore();

    // Get all user progress records
    const progressSnapshot = await db.collection('userLessons')
      .where('userId', '==', userId)
      .get();

    const progressData = progressSnapshot.docs.map(doc => doc.data());

    const completed = progressData.filter(p => p.status === 'completed');
    const totalTime = progressData.reduce((sum, p) => sum + (p.timeSpentSeconds || 0), 0);
    const scores = completed.filter(p => p.exerciseScore !== null).map(p => p.exerciseScore);
    const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    const recordings = progressData.filter(p => p.practiceRecordingId).length;

    // Get user statistics for streak
    const statsDoc = await db.collection('userStatistics').doc(userId).get();
    const stats = statsDoc.data() || {};

    // Get category breakdown
    const categoryProgress = await this.getCategoryProgress(userId);

    // Find last lesson date
    const lastLesson = completed.sort((a, b) =>
      new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    )[0];

    return {
      totalLessonsStarted: progressData.length,
      totalLessonsCompleted: completed.length,
      averageExerciseScore: Math.round(avgScore),
      totalTimeSpentMinutes: Math.round(totalTime / 60),
      totalPracticeRecordings: recordings,
      currentStreak: stats.currentStreak || 0,
      longestStreak: stats.longestStreak || 0,
      lastLessonAt: lastLesson?.completedAt || null,
      categoryProgress,
    };
  }

  // ==================== PRIVATE HELPERS ====================

  private async updateStatistics(userId: string, additionalSeconds: number = 0): Promise<{
    lessonsCompleted: number;
    currentStreak: number;
    totalPracticeMinutes: number;
  }> {
    const db = this.firebaseService.getFirestore();

    // Count completed lessons
    const completedSnapshot = await db.collection('userLessons')
      .where('userId', '==', userId)
      .where('status', '==', 'completed')
      .get();

    const count = completedSnapshot.size;

    // Get existing stats
    const statsDoc = await db.collection('userStatistics').doc(userId).get();
    const existingStats = statsDoc.data() || {};

    // Calculate streak
    const today = new Date().toDateString();
    const lastPracticeDate = existingStats.lastPracticeDate || null;
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    let currentStreak = existingStats.currentStreak || 0;
    if (lastPracticeDate === yesterday) {
      currentStreak += 1;
    } else if (lastPracticeDate !== today) {
      currentStreak = 1;
    }

    const longestStreak = Math.max(currentStreak, existingStats.longestStreak || 0);
    const totalPracticeMinutes = (existingStats.totalPracticeMinutes || 0) + Math.round(additionalSeconds / 60);

    await db.collection('userStatistics').doc(userId).set({
      userId,
      lessonsCompleted: count,
      currentStreak,
      longestStreak,
      totalPracticeMinutes,
      lastPracticeDate: today,
      updatedAt: new Date().toISOString(),
    }, { merge: true });

    return { lessonsCompleted: count, currentStreak, totalPracticeMinutes };
  }

  private async getCategoryProgress(userId: string): Promise<CategoryProgressItem[]> {
    const db = this.firebaseService.getFirestore();

    // Get all lessons
    const lessonsSnapshot = await db.collection('lessons')
      .where('isPublished', '==', true)
      .get();

    // Get user's completed lessons
    const completedSnapshot = await db.collection('userLessons')
      .where('userId', '==', userId)
      .where('status', '==', 'completed')
      .get();

    const completedMap = new Map<string, number>();
    const scoreMap = new Map<string, number[]>();

    // Map lesson IDs to categories and scores
    const lessonCategories = new Map<string, string>();
    lessonsSnapshot.docs.forEach(doc => {
      lessonCategories.set(doc.id, doc.data().category);
    });

    completedSnapshot.docs.forEach(doc => {
      const data = doc.data();
      const category = lessonCategories.get(data.lessonId);
      if (category) {
        completedMap.set(category, (completedMap.get(category) || 0) + 1);
        if (data.exerciseScore !== null) {
          const scores = scoreMap.get(category) || [];
          scores.push(data.exerciseScore);
          scoreMap.set(category, scores);
        }
      }
    });

    // Count total lessons per category
    const totalByCategory = new Map<string, number>();
    lessonsSnapshot.docs.forEach(doc => {
      const category = doc.data().category;
      totalByCategory.set(category, (totalByCategory.get(category) || 0) + 1);
    });

    // Build response
    return Array.from(totalByCategory.entries()).map(([category, total]) => {
      const completed = completedMap.get(category) || 0;
      const scores = scoreMap.get(category) || [];
      const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

      return {
        category,
        lessonsCompleted: completed,
        totalLessons: total,
        averageScore: Math.round(avgScore),
      };
    });
  }

  private getSubCategoriesForCategory(category: TopicCategory): SubCategoryInfo[] {
    const subCategoryKeys: Record<TopicCategory, string[]> = {
      [TopicCategory.COMMUNICATION_SKILLS]: [
        'public_speaking', 'storytelling', 'negotiation', 'active_listening',
        'persuasion', 'conflict_resolution', 'networking', 'presentation',
      ],
      [TopicCategory.SELF_GROWTH]: [
        'confidence', 'emotional_intelligence', 'leadership', 'relationships',
        'mindfulness', 'goal_setting', 'self_awareness', 'resilience',
      ],
      [TopicCategory.KNOWLEDGE]: [
        'art', 'history', 'logic', 'biology', 'math', 'finance',
        'science', 'technology', 'philosophy',
      ],
    };

    return (subCategoryKeys[category] || []).map(key => ({
      key,
      displayName: SUBCATEGORY_METADATA[key]?.displayName || key,
      description: SUBCATEGORY_METADATA[key]?.description || '',
    }));
  }

  private formatLessonSummary(lesson: any) {
    return {
      id: lesson.id,
      title: lesson.title,
      description: lesson.description || '',
      category: lesson.category || '',
      difficulty: lesson.difficulty,
      durationMinutes: lesson.durationMinutes || 15,
      order: lesson.order || 0,
      isPublished: lesson.isPublished || false,
    };
  }

  private formatLessonFull(lesson: any): any {
    return {
      id: lesson.id,
      title: lesson.title,
      description: lesson.description || '',
      topicId: lesson.topicId || null,
      difficulty: lesson.difficulty,
      category: lesson.category || '',
      // Micro-lesson structure
      introductionContent: lesson.introductionContent || null,
      learningObjectives: lesson.learningObjectives || [],
      coreConceptContent: lesson.coreConceptContent || null,
      exerciseType: lesson.exerciseType || null,
      exerciseContent: lesson.exerciseContent || null,
      practicePrompt: lesson.practicePrompt || null,
      practiceGuidelines: lesson.practiceGuidelines || [],
      practiceRecordingDurationSeconds: lesson.practiceRecordingDurationSeconds || 120,
      summaryContent: lesson.summaryContent || null,
      keyTakeaways: lesson.keyTakeaways || [],
      // General fields
      content: lesson.content || null,
      durationMinutes: lesson.durationMinutes || 15,
      order: lesson.order || 0,
      isPublished: lesson.isPublished || false,
      createdAt: lesson.createdAt || '',
      updatedAt: lesson.updatedAt || '',
    };
  }

  private formatProgress(id: string, data: any): UserLessonProgressResponse {
    return {
      id,
      userId: data.userId,
      lessonId: data.lessonId,
      status: data.status || LessonStatus.NOT_STARTED,
      currentSection: data.currentSection || null,
      startedAt: data.startedAt || null,
      completedAt: data.completedAt || null,
      exerciseScore: data.exerciseScore ?? null,
      exerciseAttempts: data.exerciseAttempts || 0,
      practiceRecordingId: data.practiceRecordingId || null,
      practiceCompleted: data.practiceCompleted || false,
      timeSpentSeconds: data.timeSpentSeconds || 0,
      lastAccessedAt: data.lastAccessedAt || data.createdAt || '',
      deviceType: data.deviceType || null,
    };
  }
}
