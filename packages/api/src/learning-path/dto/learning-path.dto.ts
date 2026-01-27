import { IsString, IsOptional, IsEnum, IsArray, IsNumber, IsBoolean, Min, Max, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// ==================== ENUMS ====================

export enum UserGoal {
  JOB_INTERVIEWS = 'job_interviews',
  PRESENTATIONS = 'presentations',
  DAILY_CONVERSATIONS = 'daily_conversations',
  PUBLIC_SPEAKING = 'public_speaking',
  LEADERSHIP = 'leadership',
  NETWORKING = 'networking',
  CONFLICT_RESOLUTION = 'conflict_resolution',
  SALES_PITCHES = 'sales_pitches',
}

export enum PathStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  PAUSED = 'paused',
}

export enum AdjustmentType {
  ADD_REMEDIAL = 'add_remedial',
  SKIP_TO_ADVANCED = 'skip_to_advanced',
  ADD_FILLER_WORD_LESSON = 'add_filler_word_lesson',
  ADD_PACING_EXERCISE = 'add_pacing_exercise',
  ADD_CONFIDENCE_BOOSTER = 'add_confidence_booster',
  SLOW_DOWN_PACE = 'slow_down_pace',
  REPEAT_LESSON = 'repeat_lesson',
  MANUAL_ADJUSTMENT = 'manual_adjustment',
}

export enum AdjustmentReason {
  LOW_SCORE = 'low_score',
  HIGH_SCORE = 'high_score',
  FILLER_WORDS_DETECTED = 'filler_words_detected',
  PACE_TOO_FAST = 'pace_too_fast',
  PACE_TOO_SLOW = 'pace_too_slow',
  USER_REQUEST = 'user_request',
  MULTIPLE_FAILURES = 'multiple_failures',
  CONFIDENCE_ISSUES = 'confidence_issues',
}

// ==================== PATH TEMPLATE STRUCTURES ====================

export interface LessonStep {
  lessonId: string;
  title: string;
  order: number;
  isRequired: boolean;
  isRemedial: boolean;
  isAdvanced: boolean;
  estimatedMinutes: number;
  prerequisites: string[]; // lesson IDs that must be completed first
  skills: string[]; // skills this lesson teaches
}

export interface PathMilestone {
  id: string;
  name: string;
  description: string;
  afterLessonOrder: number; // milestone appears after this lesson
  celebrationMessage: string;
  badge?: string;
}

export interface LearningPathTemplate {
  id: string;
  name: string;
  description: string;
  targetGoal: UserGoal;
  estimatedDays: number;
  totalLessons: number;
  difficulty: string;
  lessonSequence: LessonStep[];
  milestones: PathMilestone[];
  remedialLessons: LessonStep[]; // lessons to add if struggling
  advancedLessons: LessonStep[]; // lessons to add if excelling
  createdAt: string;
  updatedAt: string;
}

// ==================== USER PATH STRUCTURES ====================

export interface UserLessonProgress {
  lessonId: string;
  order: number;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  exerciseScore: number | null;
  practiceScore: number | null;
  attempts: number;
  completedAt: string | null;
  timeSpentSeconds: number;
  wasRemedial: boolean;
  wasAdvanced: boolean;
}

export interface UserLearningPath {
  id: string;
  userId: string;
  pathTemplateId: string;
  pathName: string;
  targetGoal: UserGoal;
  status: PathStatus;
  currentPosition: number; // current lesson order
  totalLessons: number;
  lessonsCompleted: number;
  averageScore: number;
  lessonProgress: UserLessonProgress[];
  adjustments: PathAdjustment[];
  startedAt: string;
  lastActivityAt: string;
  completedAt: string | null;
  estimatedCompletionDate: string | null;
}

export interface PathAdjustment {
  id: string;
  reason: AdjustmentReason;
  type: AdjustmentType;
  description: string;
  lessonId: string | null; // lesson that triggered adjustment
  addedLessonIds: string[];
  removedLessonIds: string[];
  createdAt: string;
}

// ==================== REQUEST DTOs ====================

export class GeneratePathDto {
  @IsEnum(UserGoal)
  primaryGoal: UserGoal;

  @IsArray()
  @IsEnum(UserGoal, { each: true })
  @IsOptional()
  secondaryGoals?: UserGoal[];

  @IsString()
  @IsOptional()
  currentSkillLevel?: string; // 'beginner', 'intermediate', 'advanced'

  @IsNumber()
  @Min(5)
  @Max(60)
  @IsOptional()
  dailyTimeMinutes?: number; // how much time user can dedicate daily

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  focusAreas?: string[]; // specific areas to focus on
}

export class AdjustPathDto {
  @IsEnum(AdjustmentType)
  adjustmentType: AdjustmentType;

  @IsString()
  @IsOptional()
  reason?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  addLessonIds?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  removeLessonIds?: string[];

  @IsNumber()
  @IsOptional()
  moveToPosition?: number; // jump to specific position
}

export class UpdatePathProgressDto {
  @IsString()
  lessonId: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  exerciseScore?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  practiceScore?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  timeSpentSeconds?: number;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  // Speech analysis data for adaptive adjustments
  @IsNumber()
  @IsOptional()
  fillerWordCount?: number;

  @IsNumber()
  @IsOptional()
  wordsPerMinute?: number; // for pace detection

  @IsNumber()
  @IsOptional()
  confidenceScore?: number; // from voice analysis
}

// ==================== RESPONSE INTERFACES ====================

export interface LearningPathResponse {
  path: UserLearningPath;
  currentLesson: LessonStep | null;
  nextLesson: LessonStep | null;
  upcomingLessons: LessonStep[];
  completedLessons: LessonStep[];
  progress: PathProgressSummary;
  recentAdjustments: PathAdjustment[];
  nextMilestone: PathMilestone | null;
}

export interface PathProgressSummary {
  percentComplete: number;
  lessonsCompleted: number;
  totalLessons: number;
  averageScore: number;
  currentStreak: number;
  estimatedDaysRemaining: number;
  strengthAreas: string[];
  improvementAreas: string[];
}

export interface PathGenerationResult {
  success: boolean;
  path: UserLearningPath;
  template: LearningPathTemplate;
  message: string;
  estimatedCompletionDate: string;
}

export interface PathAdjustmentResult {
  success: boolean;
  adjustment: PathAdjustment;
  updatedPath: UserLearningPath;
  message: string;
}

export interface AvailablePathsResponse {
  paths: LearningPathTemplate[];
  recommendedPath: LearningPathTemplate | null;
  userGoals: UserGoal[];
}
