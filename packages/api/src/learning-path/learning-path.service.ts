import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { FirebaseService } from '../database/firebase.service';
import {
  UserGoal,
  PathStatus,
  AdjustmentType,
  AdjustmentReason,
  LessonStep,
  PathMilestone,
  LearningPathTemplate,
  UserLearningPath,
  UserLessonProgress,
  PathAdjustment,
  GeneratePathDto,
  AdjustPathDto,
  UpdatePathProgressDto,
  LearningPathResponse,
  PathProgressSummary,
  PathGenerationResult,
  PathAdjustmentResult,
  AvailablePathsResponse,
} from './dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LearningPathService {
  private readonly logger = new Logger(LearningPathService.name);

  // Predefined path templates based on user goals
  private readonly PATH_TEMPLATES: Record<UserGoal, Partial<LearningPathTemplate>> = {
    [UserGoal.JOB_INTERVIEWS]: {
      name: 'Interview Mastery',
      description: 'Master job interviews from preparation to follow-up',
      estimatedDays: 21,
      difficulty: 'intermediate',
      lessonSequence: [
        { lessonId: 'interview-prep-basics', title: 'Interview Preparation Fundamentals', order: 1, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['preparation', 'research'] },
        { lessonId: 'star-method', title: 'The STAR Method for Behavioral Questions', order: 2, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: ['interview-prep-basics'], skills: ['storytelling', 'structure'] },
        { lessonId: 'confidence-building', title: 'Building Interview Confidence', order: 3, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['confidence', 'mindset'] },
        { lessonId: 'body-language-interview', title: 'Body Language for Interviews', order: 4, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: ['confidence-building'], skills: ['body-language', 'presence'] },
        { lessonId: 'common-questions', title: 'Answering Common Interview Questions', order: 5, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: ['star-method'], skills: ['communication', 'clarity'] },
        { lessonId: 'salary-negotiation', title: 'Salary Negotiation Basics', order: 6, isRequired: false, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['negotiation', 'assertiveness'] },
        { lessonId: 'virtual-interview', title: 'Virtual Interview Excellence', order: 7, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['technology', 'presence'] },
      ],
      milestones: [
        { id: 'milestone-1', name: 'Foundation Complete', description: 'You\'ve learned the basics!', afterLessonOrder: 2, celebrationMessage: 'Great start! You now understand interview fundamentals.', badge: 'foundation' },
        { id: 'milestone-2', name: 'Interview Ready', description: 'Ready for your interview!', afterLessonOrder: 5, celebrationMessage: 'You\'re prepared to ace your interviews!', badge: 'interview-ready' },
      ],
    },

    [UserGoal.PRESENTATIONS]: {
      name: 'Presentation Pro',
      description: 'Deliver compelling presentations that captivate any audience',
      estimatedDays: 28,
      difficulty: 'intermediate',
      lessonSequence: [
        { lessonId: 'presentation-structure', title: 'Structuring Your Presentation', order: 1, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['structure', 'organization'] },
        { lessonId: 'storytelling-presentations', title: 'Storytelling in Presentations', order: 2, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: ['presentation-structure'], skills: ['storytelling', 'engagement'] },
        { lessonId: 'voice-control', title: 'Mastering Voice Control', order: 3, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['voice', 'pacing'] },
        { lessonId: 'visual-aids', title: 'Creating Effective Visual Aids', order: 4, isRequired: false, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: ['presentation-structure'], skills: ['design', 'visuals'] },
        { lessonId: 'audience-engagement', title: 'Engaging Your Audience', order: 5, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: ['storytelling-presentations'], skills: ['engagement', 'interaction'] },
        { lessonId: 'qa-handling', title: 'Handling Q&A Sessions', order: 6, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['thinking-on-feet', 'clarity'] },
        { lessonId: 'presentation-anxiety', title: 'Overcoming Presentation Anxiety', order: 7, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['confidence', 'mindset'] },
      ],
      milestones: [
        { id: 'milestone-1', name: 'Content Creator', description: 'Master of presentation content', afterLessonOrder: 2, celebrationMessage: 'Your presentation structure is on point!', badge: 'content-creator' },
        { id: 'milestone-2', name: 'Stage Ready', description: 'Ready to present anywhere', afterLessonOrder: 6, celebrationMessage: 'You\'re ready to captivate any audience!', badge: 'stage-ready' },
      ],
    },

    [UserGoal.DAILY_CONVERSATIONS]: {
      name: 'Conversation Confidence',
      description: 'Excel in everyday conversations and build meaningful connections',
      estimatedDays: 21,
      difficulty: 'beginner',
      lessonSequence: [
        { lessonId: 'active-listening', title: 'The Art of Active Listening', order: 1, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['listening', 'attention'] },
        { lessonId: 'small-talk-mastery', title: 'Mastering Small Talk', order: 2, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: ['active-listening'], skills: ['conversation', 'rapport'] },
        { lessonId: 'assertive-communication', title: 'Assertive Communication', order: 3, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['assertiveness', 'boundaries'] },
        { lessonId: 'empathy-conversations', title: 'Empathy in Conversations', order: 4, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: ['active-listening'], skills: ['empathy', 'emotional-intelligence'] },
        { lessonId: 'asking-questions', title: 'The Power of Questions', order: 5, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: ['small-talk-mastery'], skills: ['curiosity', 'engagement'] },
        { lessonId: 'difficult-topics', title: 'Navigating Difficult Topics', order: 6, isRequired: false, isRemedial: false, isAdvanced: true, estimatedMinutes: 15, prerequisites: ['assertive-communication', 'empathy-conversations'], skills: ['tact', 'diplomacy'] },
      ],
      milestones: [
        { id: 'milestone-1', name: 'Active Listener', description: 'You truly hear others', afterLessonOrder: 1, celebrationMessage: 'You\'ve mastered the foundation of great conversations!', badge: 'listener' },
        { id: 'milestone-2', name: 'Conversation Master', description: 'Conversations flow naturally', afterLessonOrder: 5, celebrationMessage: 'You can connect with anyone!', badge: 'conversationalist' },
      ],
    },

    [UserGoal.PUBLIC_SPEAKING]: {
      name: 'Public Speaking Mastery',
      description: 'Overcome fear and become a confident public speaker',
      estimatedDays: 35,
      difficulty: 'intermediate',
      lessonSequence: [
        { lessonId: 'overcoming-fear', title: 'Overcoming the Fear of Public Speaking', order: 1, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['confidence', 'mindset'] },
        { lessonId: 'opening-hooks', title: 'Powerful Opening Hooks', order: 2, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['hooks', 'attention'] },
        { lessonId: 'speech-pacing', title: 'Pacing Your Speech', order: 3, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['pacing', 'rhythm'] },
        { lessonId: 'audience-engagement-speaking', title: 'Audience Engagement Techniques', order: 4, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: ['opening-hooks'], skills: ['engagement', 'connection'] },
        { lessonId: 'body-language-speaking', title: 'Body Language on Stage', order: 5, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['body-language', 'presence'] },
        { lessonId: 'handling-mistakes', title: 'Gracefully Handling Mistakes', order: 6, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['recovery', 'composure'] },
        { lessonId: 'closing-impact', title: 'Closing with Impact', order: 7, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: ['opening-hooks'], skills: ['closing', 'memorability'] },
        { lessonId: 'impromptu-speaking', title: 'Impromptu Speaking', order: 8, isRequired: false, isRemedial: false, isAdvanced: true, estimatedMinutes: 15, prerequisites: ['speech-pacing'], skills: ['thinking-on-feet', 'adaptability'] },
      ],
      milestones: [
        { id: 'milestone-1', name: 'Fear Conquered', description: 'You\'ve overcome your fear!', afterLessonOrder: 1, celebrationMessage: 'The hardest step is behind you!', badge: 'fearless' },
        { id: 'milestone-2', name: 'Stage Presence', description: 'Command any stage', afterLessonOrder: 5, celebrationMessage: 'You own the stage!', badge: 'stage-presence' },
        { id: 'milestone-3', name: 'Public Speaking Pro', description: 'A true public speaker', afterLessonOrder: 7, celebrationMessage: 'You\'re ready for any speaking opportunity!', badge: 'speaker-pro' },
      ],
    },

    [UserGoal.LEADERSHIP]: {
      name: 'Leadership Communication',
      description: 'Communicate like a leader and inspire your team',
      estimatedDays: 35,
      difficulty: 'advanced',
      lessonSequence: [
        { lessonId: 'executive-presence', title: 'Building Executive Presence', order: 1, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['presence', 'authority'] },
        { lessonId: 'difficult-conversations', title: 'Navigating Difficult Conversations', order: 2, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['diplomacy', 'directness'] },
        { lessonId: 'motivation-communication', title: 'Motivating Through Communication', order: 3, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: ['executive-presence'], skills: ['inspiration', 'motivation'] },
        { lessonId: 'giving-feedback', title: 'Giving Effective Feedback', order: 4, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: ['difficult-conversations'], skills: ['feedback', 'coaching'] },
        { lessonId: 'receiving-feedback', title: 'Receiving Feedback Gracefully', order: 5, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['humility', 'growth'] },
        { lessonId: 'team-alignment', title: 'Aligning Your Team', order: 6, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: ['motivation-communication'], skills: ['alignment', 'vision'] },
        { lessonId: 'crisis-communication', title: 'Crisis Communication', order: 7, isRequired: false, isRemedial: false, isAdvanced: true, estimatedMinutes: 15, prerequisites: ['executive-presence', 'difficult-conversations'], skills: ['crisis', 'composure'] },
      ],
      milestones: [
        { id: 'milestone-1', name: 'Executive Voice', description: 'You command respect', afterLessonOrder: 1, celebrationMessage: 'Your presence speaks volumes!', badge: 'executive' },
        { id: 'milestone-2', name: 'Team Leader', description: 'Your team follows you', afterLessonOrder: 4, celebrationMessage: 'You inspire and develop your team!', badge: 'team-leader' },
        { id: 'milestone-3', name: 'Leadership Master', description: 'A complete leader', afterLessonOrder: 6, celebrationMessage: 'You communicate like a true leader!', badge: 'leader-master' },
      ],
    },

    [UserGoal.NETWORKING]: {
      name: 'Networking Ninja',
      description: 'Build meaningful professional connections effortlessly',
      estimatedDays: 21,
      difficulty: 'beginner',
      lessonSequence: [
        { lessonId: 'networking-mindset', title: 'The Networking Mindset', order: 1, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['mindset', 'openness'] },
        { lessonId: 'elevator-pitch', title: 'Crafting Your Elevator Pitch', order: 2, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['clarity', 'conciseness'] },
        { lessonId: 'networking-conversations', title: 'Starting Networking Conversations', order: 3, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: ['networking-mindset'], skills: ['icebreakers', 'rapport'] },
        { lessonId: 'follow-up', title: 'The Art of Follow-Up', order: 4, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: ['networking-conversations'], skills: ['persistence', 'relationship-building'] },
        { lessonId: 'linkedin-communication', title: 'LinkedIn Communication', order: 5, isRequired: false, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: ['elevator-pitch'], skills: ['digital-presence', 'writing'] },
      ],
      milestones: [
        { id: 'milestone-1', name: 'Connector', description: 'Making connections is easy', afterLessonOrder: 3, celebrationMessage: 'You can strike up a conversation with anyone!', badge: 'connector' },
      ],
    },

    [UserGoal.CONFLICT_RESOLUTION]: {
      name: 'Conflict Resolution Expert',
      description: 'Turn conflicts into opportunities for growth',
      estimatedDays: 28,
      difficulty: 'intermediate',
      lessonSequence: [
        { lessonId: 'conflict-understanding', title: 'Understanding Conflict Dynamics', order: 1, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['awareness', 'analysis'] },
        { lessonId: 'staying-calm', title: 'Staying Calm Under Pressure', order: 2, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['composure', 'emotional-regulation'] },
        { lessonId: 'nonviolent-communication', title: 'Nonviolent Communication', order: 3, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: ['conflict-understanding'], skills: ['empathy', 'expression'] },
        { lessonId: 'finding-common-ground', title: 'Finding Common Ground', order: 4, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: ['nonviolent-communication'], skills: ['negotiation', 'collaboration'] },
        { lessonId: 'mediation-basics', title: 'Mediation Basics', order: 5, isRequired: false, isRemedial: false, isAdvanced: true, estimatedMinutes: 15, prerequisites: ['finding-common-ground'], skills: ['mediation', 'neutrality'] },
      ],
      milestones: [
        { id: 'milestone-1', name: 'Peace Keeper', description: 'Conflicts don\'t scare you', afterLessonOrder: 2, celebrationMessage: 'You stay calm when others panic!', badge: 'peace-keeper' },
        { id: 'milestone-2', name: 'Resolution Expert', description: 'You turn conflicts into growth', afterLessonOrder: 4, celebrationMessage: 'You can resolve any conflict!', badge: 'resolver' },
      ],
    },

    [UserGoal.SALES_PITCHES]: {
      name: 'Sales Communication',
      description: 'Persuade and close deals with confidence',
      estimatedDays: 28,
      difficulty: 'intermediate',
      lessonSequence: [
        { lessonId: 'understanding-buyer', title: 'Understanding Your Buyer', order: 1, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['empathy', 'research'] },
        { lessonId: 'value-proposition', title: 'Crafting Your Value Proposition', order: 2, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: ['understanding-buyer'], skills: ['clarity', 'persuasion'] },
        { lessonId: 'objection-handling', title: 'Handling Objections', order: 3, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: ['value-proposition'], skills: ['thinking-on-feet', 'reframing'] },
        { lessonId: 'closing-techniques', title: 'Closing Techniques', order: 4, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: ['objection-handling'], skills: ['closing', 'timing'] },
        { lessonId: 'storytelling-sales', title: 'Storytelling in Sales', order: 5, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['storytelling', 'connection'] },
        { lessonId: 'follow-up-sales', title: 'Effective Sales Follow-Up', order: 6, isRequired: true, isRemedial: false, isAdvanced: false, estimatedMinutes: 15, prerequisites: ['closing-techniques'], skills: ['persistence', 'relationship-building'] },
      ],
      milestones: [
        { id: 'milestone-1', name: 'Pitch Perfect', description: 'Your pitch is compelling', afterLessonOrder: 2, celebrationMessage: 'Your value proposition is crystal clear!', badge: 'pitcher' },
        { id: 'milestone-2', name: 'Closer', description: 'You close deals with ease', afterLessonOrder: 4, celebrationMessage: 'You know how to seal the deal!', badge: 'closer' },
      ],
    },
  };

  // Remedial lessons for common struggles
  private readonly REMEDIAL_LESSONS: Record<string, LessonStep> = {
    'filler-words': { lessonId: 'filler-words-elimination', title: 'Eliminating Filler Words', order: 0, isRequired: false, isRemedial: true, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['clarity', 'fluency'] },
    'pacing': { lessonId: 'pacing-practice', title: 'Pacing Practice Session', order: 0, isRequired: false, isRemedial: true, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['pacing', 'rhythm'] },
    'confidence': { lessonId: 'confidence-booster', title: 'Quick Confidence Booster', order: 0, isRequired: false, isRemedial: true, isAdvanced: false, estimatedMinutes: 10, prerequisites: [], skills: ['confidence', 'mindset'] },
    'basics': { lessonId: 'communication-basics', title: 'Communication Fundamentals Review', order: 0, isRequired: false, isRemedial: true, isAdvanced: false, estimatedMinutes: 15, prerequisites: [], skills: ['basics', 'foundation'] },
  };

  constructor(private firebaseService: FirebaseService) {}

  // ==================== PUBLIC METHODS ====================

  /**
   * Get user's current learning path with full details
   */
  async getUserLearningPath(userId: string): Promise<LearningPathResponse> {
    const db = this.firebaseService.getFirestore();

    // Get user's active learning path
    const pathSnapshot = await db.collection('userLearningPaths')
      .where('userId', '==', userId)
      .where('status', 'in', [PathStatus.IN_PROGRESS, PathStatus.NOT_STARTED])
      .orderBy('startedAt', 'desc')
      .limit(1)
      .get();

    if (pathSnapshot.empty) {
      throw new NotFoundException('No active learning path found. Generate one first.');
    }

    const pathDoc = pathSnapshot.docs[0];
    const path = { id: pathDoc.id, ...pathDoc.data() } as UserLearningPath;

    // Get the path template for lesson details
    const template = this.getPathTemplate(path.targetGoal);

    // Calculate current and next lessons
    const currentLesson = this.getLessonAtPosition(template, path.currentPosition);
    const nextLesson = this.getLessonAtPosition(template, path.currentPosition + 1);

    // Get upcoming lessons (next 5)
    const upcomingLessons: LessonStep[] = [];
    for (let i = path.currentPosition + 1; i <= path.currentPosition + 5 && i <= template.lessonSequence.length; i++) {
      const lesson = this.getLessonAtPosition(template, i);
      if (lesson) upcomingLessons.push(lesson);
    }

    // Get completed lessons
    const completedLessons = template.lessonSequence.filter(
      l => path.lessonProgress.find(p => p.lessonId === l.lessonId && p.status === 'completed')
    );

    // Calculate progress summary
    const progress = this.calculateProgressSummary(path, template);

    // Get recent adjustments
    const recentAdjustments = path.adjustments.slice(-5);

    // Get next milestone
    const nextMilestone = template.milestones.find(m => m.afterLessonOrder > path.currentPosition) || null;

    return {
      path,
      currentLesson,
      nextLesson,
      upcomingLessons,
      completedLessons,
      progress,
      recentAdjustments,
      nextMilestone,
    };
  }

  /**
   * Generate a new learning path based on user's goals
   */
  async generateLearningPath(userId: string, dto: GeneratePathDto): Promise<PathGenerationResult> {
    const db = this.firebaseService.getFirestore();

    // Check if user already has an active path
    const existingPathSnapshot = await db.collection('userLearningPaths')
      .where('userId', '==', userId)
      .where('status', '==', PathStatus.IN_PROGRESS)
      .limit(1)
      .get();

    if (!existingPathSnapshot.empty) {
      // Pause existing path
      await existingPathSnapshot.docs[0].ref.update({
        status: PathStatus.PAUSED,
        lastActivityAt: new Date().toISOString(),
      });
    }

    // Get the template for the primary goal
    const template = this.getPathTemplate(dto.primaryGoal);

    // Adjust template based on skill level
    let lessonSequence = [...template.lessonSequence];
    if (dto.currentSkillLevel === 'advanced') {
      // Skip beginner lessons for advanced users
      lessonSequence = lessonSequence.filter(l => !l.isRemedial);
    } else if (dto.currentSkillLevel === 'beginner') {
      // Add foundational lessons for beginners
      lessonSequence = [this.REMEDIAL_LESSONS['basics'], ...lessonSequence];
    }

    // Initialize lesson progress
    const lessonProgress: UserLessonProgress[] = lessonSequence.map((lesson, index) => ({
      lessonId: lesson.lessonId,
      order: index + 1,
      status: 'pending',
      exerciseScore: null,
      practiceScore: null,
      attempts: 0,
      completedAt: null,
      timeSpentSeconds: 0,
      wasRemedial: lesson.isRemedial,
      wasAdvanced: lesson.isAdvanced,
    }));

    // Calculate estimated completion date
    const dailyMinutes = dto.dailyTimeMinutes || 15;
    const totalMinutes = lessonSequence.reduce((sum, l) => sum + l.estimatedMinutes, 0);
    const estimatedDays = Math.ceil(totalMinutes / dailyMinutes);
    const estimatedCompletionDate = new Date();
    estimatedCompletionDate.setDate(estimatedCompletionDate.getDate() + estimatedDays);

    const now = new Date().toISOString();

    // Create user learning path
    const userPath: Omit<UserLearningPath, 'id'> = {
      userId,
      pathTemplateId: template.id,
      pathName: template.name,
      targetGoal: dto.primaryGoal,
      status: PathStatus.IN_PROGRESS,
      currentPosition: 1,
      totalLessons: lessonSequence.length,
      lessonsCompleted: 0,
      averageScore: 0,
      lessonProgress,
      adjustments: [],
      startedAt: now,
      lastActivityAt: now,
      completedAt: null,
      estimatedCompletionDate: estimatedCompletionDate.toISOString(),
    };

    const docRef = await db.collection('userLearningPaths').add(userPath);

    // Update user profile with learning path info
    await db.collection('profiles').doc(userId).update({
      currentLearningPathId: docRef.id,
      primaryGoal: dto.primaryGoal,
      updatedAt: now,
    });

    return {
      success: true,
      path: { id: docRef.id, ...userPath },
      template: { ...template, lessonSequence } as LearningPathTemplate,
      message: `Your "${template.name}" learning path has been created!`,
      estimatedCompletionDate: estimatedCompletionDate.toISOString(),
    };
  }

  /**
   * Update progress on a lesson and trigger adaptive adjustments
   */
  async updateLessonProgress(userId: string, dto: UpdatePathProgressDto): Promise<LearningPathResponse> {
    const db = this.firebaseService.getFirestore();

    // Get user's active path
    const pathSnapshot = await db.collection('userLearningPaths')
      .where('userId', '==', userId)
      .where('status', '==', PathStatus.IN_PROGRESS)
      .limit(1)
      .get();

    if (pathSnapshot.empty) {
      throw new NotFoundException('No active learning path found');
    }

    const pathDoc = pathSnapshot.docs[0];
    const path = { id: pathDoc.id, ...pathDoc.data() } as UserLearningPath;

    // Find the lesson in progress
    const lessonIndex = path.lessonProgress.findIndex(l => l.lessonId === dto.lessonId);
    if (lessonIndex === -1) {
      throw new NotFoundException('Lesson not found in learning path');
    }

    const lesson = path.lessonProgress[lessonIndex];
    const now = new Date().toISOString();

    // Update lesson progress
    lesson.exerciseScore = dto.exerciseScore ?? lesson.exerciseScore;
    lesson.practiceScore = dto.practiceScore ?? lesson.practiceScore;
    lesson.timeSpentSeconds += dto.timeSpentSeconds || 0;
    lesson.attempts += 1;

    if (dto.completed) {
      lesson.status = 'completed';
      lesson.completedAt = now;
    } else if (lesson.status === 'pending') {
      lesson.status = 'in_progress';
    }

    // Check for adaptive adjustments
    const adjustments: PathAdjustment[] = [];

    // Low score - add remedial lesson
    if (dto.exerciseScore !== undefined && dto.exerciseScore < 70) {
      const adjustment = await this.addRemedialLesson(path, lesson, AdjustmentReason.LOW_SCORE);
      if (adjustment) adjustments.push(adjustment);
    }

    // High score - consider skipping to advanced
    if (dto.exerciseScore !== undefined && dto.exerciseScore > 90 && lesson.attempts === 1) {
      const adjustment = await this.considerAdvancedContent(path, lesson);
      if (adjustment) adjustments.push(adjustment);
    }

    // Filler words detected
    if (dto.fillerWordCount !== undefined && dto.fillerWordCount > 5) {
      const adjustment = await this.addFillerWordLesson(path);
      if (adjustment) adjustments.push(adjustment);
    }

    // Pace issues
    if (dto.wordsPerMinute !== undefined) {
      if (dto.wordsPerMinute > 180) {
        const adjustment = await this.addPacingLesson(path, 'fast');
        if (adjustment) adjustments.push(adjustment);
      } else if (dto.wordsPerMinute < 100) {
        const adjustment = await this.addPacingLesson(path, 'slow');
        if (adjustment) adjustments.push(adjustment);
      }
    }

    // Confidence issues
    if (dto.confidenceScore !== undefined && dto.confidenceScore < 50) {
      const adjustment = await this.addConfidenceBooster(path);
      if (adjustment) adjustments.push(adjustment);
    }

    // Update path with new progress
    const completedCount = path.lessonProgress.filter(l => l.status === 'completed').length;
    const scores = path.lessonProgress
      .filter(l => l.exerciseScore !== null)
      .map(l => l.exerciseScore as number);
    const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

    // Move to next position if completed
    let newPosition = path.currentPosition;
    if (dto.completed && lesson.order === path.currentPosition) {
      newPosition = path.currentPosition + 1;
    }

    // Check if path is completed
    const isPathComplete = newPosition > path.totalLessons;

    await pathDoc.ref.update({
      lessonProgress: path.lessonProgress,
      currentPosition: newPosition,
      lessonsCompleted: completedCount,
      averageScore: Math.round(avgScore),
      adjustments: [...path.adjustments, ...adjustments],
      lastActivityAt: now,
      status: isPathComplete ? PathStatus.COMPLETED : PathStatus.IN_PROGRESS,
      completedAt: isPathComplete ? now : null,
    });

    return this.getUserLearningPath(userId);
  }

  /**
   * Manually adjust the learning path
   */
  async adjustPath(userId: string, dto: AdjustPathDto): Promise<PathAdjustmentResult> {
    const db = this.firebaseService.getFirestore();

    // Get user's active path
    const pathSnapshot = await db.collection('userLearningPaths')
      .where('userId', '==', userId)
      .where('status', '==', PathStatus.IN_PROGRESS)
      .limit(1)
      .get();

    if (pathSnapshot.empty) {
      throw new NotFoundException('No active learning path found');
    }

    const pathDoc = pathSnapshot.docs[0];
    const path = { id: pathDoc.id, ...pathDoc.data() } as UserLearningPath;
    const now = new Date().toISOString();

    const adjustment: PathAdjustment = {
      id: uuidv4(),
      reason: AdjustmentReason.USER_REQUEST,
      type: dto.adjustmentType,
      description: dto.reason || 'Manual adjustment requested',
      lessonId: null,
      addedLessonIds: dto.addLessonIds || [],
      removedLessonIds: dto.removeLessonIds || [],
      createdAt: now,
    };

    // Apply adjustment
    let lessonProgress = [...path.lessonProgress];

    // Add lessons
    if (dto.addLessonIds && dto.addLessonIds.length > 0) {
      const newLessons: UserLessonProgress[] = dto.addLessonIds.map((id, index) => ({
        lessonId: id,
        order: path.totalLessons + index + 1,
        status: 'pending',
        exerciseScore: null,
        practiceScore: null,
        attempts: 0,
        completedAt: null,
        timeSpentSeconds: 0,
        wasRemedial: false,
        wasAdvanced: false,
      }));
      lessonProgress = [...lessonProgress, ...newLessons];
    }

    // Remove lessons (mark as skipped)
    if (dto.removeLessonIds && dto.removeLessonIds.length > 0) {
      lessonProgress = lessonProgress.map(l => {
        if (dto.removeLessonIds!.includes(l.lessonId) && l.status === 'pending') {
          return { ...l, status: 'skipped' as const };
        }
        return l;
      });
    }

    // Move to specific position
    let newPosition = path.currentPosition;
    if (dto.moveToPosition !== undefined) {
      newPosition = Math.max(1, Math.min(dto.moveToPosition, lessonProgress.length));
    }

    await pathDoc.ref.update({
      lessonProgress,
      currentPosition: newPosition,
      totalLessons: lessonProgress.filter(l => l.status !== 'skipped').length,
      adjustments: [...path.adjustments, adjustment],
      lastActivityAt: now,
    });

    const updatedPath = { ...path, lessonProgress, currentPosition: newPosition, adjustments: [...path.adjustments, adjustment] };

    return {
      success: true,
      adjustment,
      updatedPath,
      message: `Path adjusted: ${adjustment.description}`,
    };
  }

  /**
   * Get all available path templates
   */
  async getAvailablePaths(userId: string): Promise<AvailablePathsResponse> {
    const db = this.firebaseService.getFirestore();

    // Get user's goals from profile
    const userDoc = await db.collection('profiles').doc(userId).get();
    const userData = userDoc.data() || {};
    const userGoals = userData.learningGoals || [];

    // Build templates list
    const paths: LearningPathTemplate[] = Object.entries(this.PATH_TEMPLATES).map(([goal, template]) => ({
      id: goal,
      targetGoal: goal as UserGoal,
      ...template,
      lessonSequence: template.lessonSequence || [],
      milestones: template.milestones || [],
      remedialLessons: [],
      advancedLessons: [],
      createdAt: '',
      updatedAt: '',
    } as LearningPathTemplate));

    // Determine recommended path based on user goals
    let recommendedPath: LearningPathTemplate | null = null;
    const goalKeywords: Record<string, UserGoal> = {
      'interview': UserGoal.JOB_INTERVIEWS,
      'presentation': UserGoal.PRESENTATIONS,
      'conversation': UserGoal.DAILY_CONVERSATIONS,
      'public speaking': UserGoal.PUBLIC_SPEAKING,
      'leadership': UserGoal.LEADERSHIP,
      'networking': UserGoal.NETWORKING,
      'conflict': UserGoal.CONFLICT_RESOLUTION,
      'sales': UserGoal.SALES_PITCHES,
    };

    for (const goal of userGoals) {
      const lowerGoal = goal.toLowerCase();
      for (const [keyword, pathGoal] of Object.entries(goalKeywords)) {
        if (lowerGoal.includes(keyword)) {
          recommendedPath = paths.find(p => p.targetGoal === pathGoal) || null;
          break;
        }
      }
      if (recommendedPath) break;
    }

    // Default recommendation if no match
    if (!recommendedPath) {
      recommendedPath = paths.find(p => p.targetGoal === UserGoal.DAILY_CONVERSATIONS) || null;
    }

    return {
      paths,
      recommendedPath,
      userGoals: userGoals.map((g: string) => g as UserGoal),
    };
  }

  // ==================== PRIVATE METHODS ====================

  private getPathTemplate(goal: UserGoal): LearningPathTemplate {
    const template = this.PATH_TEMPLATES[goal];
    if (!template) {
      throw new BadRequestException(`No path template found for goal: ${goal}`);
    }

    return {
      id: goal,
      targetGoal: goal,
      ...template,
      lessonSequence: template.lessonSequence || [],
      milestones: template.milestones || [],
      remedialLessons: [],
      advancedLessons: [],
      createdAt: '',
      updatedAt: '',
    } as LearningPathTemplate;
  }

  private getLessonAtPosition(template: LearningPathTemplate, position: number): LessonStep | null {
    return template.lessonSequence.find(l => l.order === position) || null;
  }

  private calculateProgressSummary(path: UserLearningPath, template: LearningPathTemplate): PathProgressSummary {
    const completed = path.lessonProgress.filter(l => l.status === 'completed');
    const scores = completed.filter(l => l.exerciseScore !== null).map(l => l.exerciseScore as number);

    // Identify strength and improvement areas based on skill tags
    const skillScores: Record<string, number[]> = {};
    completed.forEach(progress => {
      const lesson = template.lessonSequence.find(l => l.lessonId === progress.lessonId);
      if (lesson && progress.exerciseScore !== null) {
        lesson.skills.forEach(skill => {
          if (!skillScores[skill]) skillScores[skill] = [];
          skillScores[skill].push(progress.exerciseScore as number);
        });
      }
    });

    const skillAverages = Object.entries(skillScores).map(([skill, scores]) => ({
      skill,
      avg: scores.reduce((a, b) => a + b, 0) / scores.length,
    }));

    skillAverages.sort((a, b) => b.avg - a.avg);
    const strengthAreas = skillAverages.filter(s => s.avg >= 80).slice(0, 3).map(s => s.skill);
    const improvementAreas = skillAverages.filter(s => s.avg < 70).slice(0, 3).map(s => s.skill);

    // Calculate days remaining
    const remainingLessons = path.totalLessons - path.lessonsCompleted;
    const estimatedDaysRemaining = remainingLessons; // Assuming 1 lesson per day

    return {
      percentComplete: Math.round((path.lessonsCompleted / path.totalLessons) * 100),
      lessonsCompleted: path.lessonsCompleted,
      totalLessons: path.totalLessons,
      averageScore: path.averageScore,
      currentStreak: 0, // Would need to calculate from activity
      estimatedDaysRemaining,
      strengthAreas,
      improvementAreas,
    };
  }

  private async addRemedialLesson(path: UserLearningPath, failedLesson: UserLessonProgress, reason: AdjustmentReason): Promise<PathAdjustment | null> {
    // Don't add if already too many adjustments
    const recentRemedials = path.adjustments.filter(
      a => a.type === AdjustmentType.ADD_REMEDIAL &&
           new Date(a.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    );
    if (recentRemedials.length >= 3) return null;

    const remedialLesson = this.REMEDIAL_LESSONS['basics'];

    return {
      id: uuidv4(),
      reason,
      type: AdjustmentType.ADD_REMEDIAL,
      description: `Added remedial lesson due to score below 70% on ${failedLesson.lessonId}`,
      lessonId: failedLesson.lessonId,
      addedLessonIds: [remedialLesson.lessonId],
      removedLessonIds: [],
      createdAt: new Date().toISOString(),
    };
  }

  private async considerAdvancedContent(path: UserLearningPath, excellentLesson: UserLessonProgress): Promise<PathAdjustment | null> {
    // Only suggest advanced content after multiple high scores
    const highScores = path.lessonProgress.filter(l => l.exerciseScore !== null && l.exerciseScore > 90);
    if (highScores.length < 3) return null;

    return {
      id: uuidv4(),
      reason: AdjustmentReason.HIGH_SCORE,
      type: AdjustmentType.SKIP_TO_ADVANCED,
      description: 'Excellent performance detected! Consider advancing faster.',
      lessonId: excellentLesson.lessonId,
      addedLessonIds: [],
      removedLessonIds: [],
      createdAt: new Date().toISOString(),
    };
  }

  private async addFillerWordLesson(path: UserLearningPath): Promise<PathAdjustment | null> {
    // Check if already added
    const alreadyAdded = path.adjustments.some(a => a.type === AdjustmentType.ADD_FILLER_WORD_LESSON);
    if (alreadyAdded) return null;

    const fillerLesson = this.REMEDIAL_LESSONS['filler-words'];

    return {
      id: uuidv4(),
      reason: AdjustmentReason.FILLER_WORDS_DETECTED,
      type: AdjustmentType.ADD_FILLER_WORD_LESSON,
      description: 'Added filler word elimination lesson based on speech analysis',
      lessonId: null,
      addedLessonIds: [fillerLesson.lessonId],
      removedLessonIds: [],
      createdAt: new Date().toISOString(),
    };
  }

  private async addPacingLesson(path: UserLearningPath, paceType: 'fast' | 'slow'): Promise<PathAdjustment | null> {
    const recentPacing = path.adjustments.filter(
      a => a.type === AdjustmentType.ADD_PACING_EXERCISE &&
           new Date(a.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    );
    if (recentPacing.length >= 1) return null;

    const pacingLesson = this.REMEDIAL_LESSONS['pacing'];

    return {
      id: uuidv4(),
      reason: paceType === 'fast' ? AdjustmentReason.PACE_TOO_FAST : AdjustmentReason.PACE_TOO_SLOW,
      type: AdjustmentType.ADD_PACING_EXERCISE,
      description: `Added pacing exercise - speaking pace is too ${paceType}`,
      lessonId: null,
      addedLessonIds: [pacingLesson.lessonId],
      removedLessonIds: [],
      createdAt: new Date().toISOString(),
    };
  }

  private async addConfidenceBooster(path: UserLearningPath): Promise<PathAdjustment | null> {
    const recentConfidence = path.adjustments.filter(
      a => a.type === AdjustmentType.ADD_CONFIDENCE_BOOSTER &&
           new Date(a.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    );
    if (recentConfidence.length >= 1) return null;

    const confidenceLesson = this.REMEDIAL_LESSONS['confidence'];

    return {
      id: uuidv4(),
      reason: AdjustmentReason.CONFIDENCE_ISSUES,
      type: AdjustmentType.ADD_CONFIDENCE_BOOSTER,
      description: 'Added confidence booster based on voice analysis',
      lessonId: null,
      addedLessonIds: [confidenceLesson.lessonId],
      removedLessonIds: [],
      createdAt: new Date().toISOString(),
    };
  }
}
