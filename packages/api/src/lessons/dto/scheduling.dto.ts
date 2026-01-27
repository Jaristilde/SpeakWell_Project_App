import { IsString, IsOptional, IsEnum, IsNumber, IsBoolean, Min, Max } from 'class-validator';

// ==================== ENUMS ====================

export enum SkipReason {
  NO_TIME = 'no_time',
  NOT_INTERESTED = 'not_interested',
  TOO_DIFFICULT = 'too_difficult',
  TOO_EASY = 'too_easy',
  ALREADY_KNOW = 'already_know',
  FEELING_UNWELL = 'feeling_unwell',
  OTHER = 'other',
}

export enum AssignmentStatus {
  PENDING = 'pending',
  STARTED = 'started',
  COMPLETED = 'completed',
  SKIPPED = 'skipped',
  EXPIRED = 'expired',
}

export enum LearningPath {
  COMMUNICATION_FOCUS = 'communication_focus',
  SELF_GROWTH_FOCUS = 'self_growth_focus',
  KNOWLEDGE_FOCUS = 'knowledge_focus',
  BALANCED = 'balanced',
}

// ==================== DTOs ====================

export class SkipLessonDto {
  @IsEnum(SkipReason)
  reason: SkipReason;

  @IsString()
  @IsOptional()
  feedback?: string; // Optional detailed feedback
}

export class UpdatePreferencesDto {
  @IsEnum(LearningPath)
  @IsOptional()
  learningPath?: LearningPath;

  @IsNumber()
  @Min(5)
  @Max(60)
  @IsOptional()
  preferredDurationMinutes?: number; // 5, 10, 15, 30, 60

  @IsString()
  @IsOptional()
  preferredTime?: string; // "08:00", "12:00", "20:00"

  @IsString()
  @IsOptional()
  timezone?: string; // "America/New_York"

  @IsBoolean()
  @IsOptional()
  notificationsEnabled?: boolean;

  @IsBoolean()
  @IsOptional()
  weekendsEnabled?: boolean; // Include weekends in daily lessons
}

// ==================== INTERFACES ====================

export interface DailyAssignment {
  id: string;
  userId: string;
  lessonId: string;
  assignedDate: string; // "2024-01-15"
  status: AssignmentStatus;
  assignedAt: string;
  startedAt: string | null;
  completedAt: string | null;
  skippedAt: string | null;
  skipReason: SkipReason | null;
  skipFeedback: string | null;
  expiresAt: string; // Lesson expires at end of day
}

export interface TodayLessonResponse {
  assignment: DailyAssignment | null;
  lesson: LessonPreview | null;
  isAssigned: boolean;
  message: string;
  streakDays: number;
  streakAtRisk: boolean; // True if no lesson completed today
}

export interface LessonPreview {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  durationMinutes: number;
  introductionContent: string | null;
  learningObjectives: string[];
}

export interface UpcomingLesson {
  date: string; // "2024-01-16"
  dayOfWeek: string; // "Monday"
  lesson: LessonPreview | null;
  isAssigned: boolean;
  isPast: boolean;
}

export interface UpcomingLessonsResponse {
  today: TodayLessonResponse;
  upcoming: UpcomingLesson[];
  totalPlannedLessons: number;
  recommendedPath: string;
}

export interface SkipLessonResponse {
  success: boolean;
  message: string;
  skippedLessonId: string;
  nextLesson: LessonPreview | null;
  streakMaintained: boolean;
  totalSkipsThisWeek: number;
}

export interface LessonSchedulingPreferences {
  userId: string;
  learningPath: LearningPath;
  preferredDurationMinutes: number;
  preferredTime: string;
  timezone: string;
  notificationsEnabled: boolean;
  weekendsEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

// ==================== ALGORITHM INTERFACES ====================

export interface LessonSelectionCriteria {
  userId: string;
  learningGoals: string[];
  completedLessonIds: string[];
  skippedLessonIds: string[];
  currentDifficulty: string;
  preferredCategories: string[];
  preferredDuration: number;
}

export interface ScoredLesson {
  lessonId: string;
  score: number;
  reasons: string[];
}

export interface SchedulingResult {
  selectedLessonId: string | null;
  alternativeLessonIds: string[];
  reason: string;
  isReview: boolean;
}
