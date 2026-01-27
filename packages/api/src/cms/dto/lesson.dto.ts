import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsEnum,
  IsObject,
  IsArray,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum Difficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export enum LessonExerciseType {
  QUIZ = 'quiz',
  PUZZLE = 'puzzle',
  SCENARIO = 'scenario',
  FILL_IN_BLANK = 'fill_in_blank',
  MATCHING = 'matching',
  MULTIPLE_CHOICE = 'multiple_choice',
}

// Core concept content structure (4 min section)
export class CoreConceptContent {
  @IsString()
  @IsOptional()
  text?: string;

  @IsString()
  @IsOptional()
  videoUrl?: string;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsArray()
  @IsOptional()
  keyPoints?: string[];
}

// Exercise content structure (5 min section)
export class ExerciseContent {
  @IsArray()
  @IsOptional()
  questions?: ExerciseQuestion[];

  @IsObject()
  @IsOptional()
  scenario?: ScenarioContent;

  @IsObject()
  @IsOptional()
  puzzle?: PuzzleContent;
}

export class ExerciseQuestion {
  @IsString()
  question: string;

  @IsArray()
  options: string[];

  @IsNumber()
  correctIndex: number;

  @IsString()
  @IsOptional()
  explanation?: string;
}

export class ScenarioContent {
  @IsString()
  situation: string;

  @IsString()
  role: string;

  @IsArray()
  prompts: string[];

  @IsArray()
  @IsOptional()
  sampleResponses?: string[];
}

export class PuzzleContent {
  @IsString()
  type: string; // 'word_scramble', 'matching', 'ordering'

  @IsArray()
  items: any[];

  @IsString()
  @IsOptional()
  instructions?: string;
}

export class CreateLessonDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  topicId?: string; // Link to topic

  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @IsString()
  category: string;

  // ===== MICRO-LESSON STRUCTURE =====

  // Introduction (1 min) - Topic intro and learning objectives
  @IsString()
  @IsOptional()
  introductionContent?: string; // Markdown/text

  @IsArray()
  @IsOptional()
  learningObjectives?: string[];

  // Core Concept (4 min) - Video or interactive text explanation
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => CoreConceptContent)
  coreConceptContent?: CoreConceptContent;

  // Interactive Exercise (5 min) - Puzzles, communication scenarios
  @IsEnum(LessonExerciseType)
  @IsOptional()
  exerciseType?: LessonExerciseType;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => ExerciseContent)
  exerciseContent?: ExerciseContent;

  // Practice & Record (4 min) - Speaking exercise with recording
  @IsString()
  @IsOptional()
  practicePrompt?: string;

  @IsArray()
  @IsOptional()
  practiceGuidelines?: string[];

  @IsNumber()
  @IsOptional()
  @Min(30)
  practiceRecordingDurationSeconds?: number; // Suggested recording length

  // Summary (1 min) - Key takeaways recap
  @IsString()
  @IsOptional()
  summaryContent?: string;

  @IsArray()
  @IsOptional()
  keyTakeaways?: string[];

  // ===== LEGACY/GENERAL FIELDS =====

  @IsObject()
  @IsOptional()
  content?: Record<string, any>; // Legacy JSON content field

  @IsNumber()
  @Min(1)
  @IsOptional()
  durationMinutes?: number; // Default 15

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}

export class UpdateLessonDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  topicId?: string;

  @IsEnum(Difficulty)
  @IsOptional()
  difficulty?: Difficulty;

  @IsString()
  @IsOptional()
  category?: string;

  // ===== MICRO-LESSON STRUCTURE =====

  @IsString()
  @IsOptional()
  introductionContent?: string;

  @IsArray()
  @IsOptional()
  learningObjectives?: string[];

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => CoreConceptContent)
  coreConceptContent?: CoreConceptContent;

  @IsEnum(LessonExerciseType)
  @IsOptional()
  exerciseType?: LessonExerciseType;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => ExerciseContent)
  exerciseContent?: ExerciseContent;

  @IsString()
  @IsOptional()
  practicePrompt?: string;

  @IsArray()
  @IsOptional()
  practiceGuidelines?: string[];

  @IsNumber()
  @IsOptional()
  @Min(30)
  practiceRecordingDurationSeconds?: number;

  @IsString()
  @IsOptional()
  summaryContent?: string;

  @IsArray()
  @IsOptional()
  keyTakeaways?: string[];

  // ===== LEGACY/GENERAL FIELDS =====

  @IsObject()
  @IsOptional()
  content?: Record<string, any>;

  @IsNumber()
  @Min(1)
  @IsOptional()
  durationMinutes?: number;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}

export interface LessonResponse {
  id: string;
  title: string;
  description: string;
  topicId: string | null;
  difficulty: Difficulty;
  category: string;

  // Micro-lesson structure
  introductionContent: string | null;
  learningObjectives: string[];
  coreConceptContent: CoreConceptContent | null;
  exerciseType: LessonExerciseType | null;
  exerciseContent: ExerciseContent | null;
  practicePrompt: string | null;
  practiceGuidelines: string[];
  practiceRecordingDurationSeconds: number;
  summaryContent: string | null;
  keyTakeaways: string[];

  // General fields
  content: Record<string, any> | null;
  durationMinutes: number;
  order: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// Simplified response for list views
export interface LessonSummaryResponse {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: Difficulty;
  durationMinutes: number;
  order: number;
  isPublished: boolean;
}
