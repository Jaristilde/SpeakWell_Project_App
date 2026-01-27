import { IsString, IsNumber, IsOptional, IsEnum, IsBoolean, Min } from 'class-validator';

export enum ExerciseType {
  SPEAKING = 'speaking',
  LISTENING = 'listening',
  READING = 'reading',
  PRONUNCIATION = 'pronunciation',
  VOCABULARY = 'vocabulary',
  CONVERSATION = 'conversation',
}

export class CreateExerciseDto {
  @IsEnum(ExerciseType)
  type: ExerciseType;

  @IsString()
  prompt: string;

  @IsString()
  @IsOptional()
  instructions?: string;

  @IsNumber()
  @Min(1)
  expectedDurationSeconds: number;

  @IsString()
  @IsOptional()
  lessonId?: string; // Optional link to a lesson

  @IsString()
  @IsOptional()
  topicId?: string; // Optional link to a topic

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateExerciseDto {
  @IsEnum(ExerciseType)
  @IsOptional()
  type?: ExerciseType;

  @IsString()
  @IsOptional()
  prompt?: string;

  @IsString()
  @IsOptional()
  instructions?: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  expectedDurationSeconds?: number;

  @IsString()
  @IsOptional()
  lessonId?: string;

  @IsString()
  @IsOptional()
  topicId?: string;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export interface ExerciseResponse {
  id: string;
  type: ExerciseType;
  prompt: string;
  instructions: string | null;
  expectedDurationSeconds: number;
  lessonId: string | null;
  topicId: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
