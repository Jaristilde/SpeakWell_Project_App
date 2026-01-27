import { IsString, IsNumber, IsOptional, IsEnum, IsBoolean, Min, Max } from 'class-validator';

export enum LessonStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export enum LessonSection {
  INTRODUCTION = 'introduction',
  CORE_CONCEPT = 'core_concept',
  EXERCISE = 'exercise',
  PRACTICE = 'practice',
  SUMMARY = 'summary',
}

// DTO for starting a lesson
export class StartLessonDto {
  @IsString()
  @IsOptional()
  deviceType?: string; // 'mobile', 'web', 'tablet'
}

// DTO for completing a lesson
export class CompleteLessonDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  exerciseScore?: number; // Score out of 100

  @IsString()
  @IsOptional()
  practiceRecordingId?: string; // ID of the recording if user recorded

  @IsNumber()
  @Min(0)
  timeSpentSeconds: number; // Total time spent on the lesson

  @IsBoolean()
  @IsOptional()
  skippedPractice?: boolean; // Did user skip the practice section

  @IsString()
  @IsOptional()
  feedback?: string; // Optional user feedback
}

// DTO for updating progress mid-lesson
export class UpdateProgressDto {
  @IsEnum(LessonSection)
  currentSection: LessonSection;

  @IsNumber()
  @Min(0)
  timeSpentSeconds: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  exerciseScore?: number; // Partial exercise score

  @IsNumber()
  @Min(0)
  @IsOptional()
  exerciseAttempts?: number;
}

// Response interfaces
export interface UserLessonProgressResponse {
  id: string;
  userId: string;
  lessonId: string;
  status: LessonStatus;
  currentSection: LessonSection | null;
  startedAt: string | null;
  completedAt: string | null;
  exerciseScore: number | null;
  exerciseAttempts: number;
  practiceRecordingId: string | null;
  practiceCompleted: boolean;
  timeSpentSeconds: number;
  lastAccessedAt: string;
  deviceType: string | null;
}

export interface LessonWithProgressResponse {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  durationMinutes: number;
  order: number;
  isPublished: boolean;
  // User progress
  progress: UserLessonProgressResponse | null;
  isCompleted: boolean;
  isStarted: boolean;
}

export interface DailyLessonResponse {
  lesson: LessonWithProgressResponse;
  streakDays: number;
  isNewLesson: boolean;
  recommendedReason: string;
}

export interface LessonCompletionResponse {
  success: boolean;
  lessonId: string;
  exerciseScore: number | null;
  practiceRecordingId: string | null;
  timeSpentSeconds: number;
  completedAt: string;
  // Updated stats
  totalLessonsCompleted: number;
  currentStreak: number;
  totalPracticeMinutes: number;
  // Achievements (optional)
  newAchievements?: string[];
}

// Stats response
export interface UserLessonStatsResponse {
  totalLessonsStarted: number;
  totalLessonsCompleted: number;
  averageExerciseScore: number;
  totalTimeSpentMinutes: number;
  totalPracticeRecordings: number;
  currentStreak: number;
  longestStreak: number;
  lastLessonAt: string | null;
  // Category breakdown
  categoryProgress: CategoryProgressItem[];
}

export interface CategoryProgressItem {
  category: string;
  lessonsCompleted: number;
  totalLessons: number;
  averageScore: number;
}
