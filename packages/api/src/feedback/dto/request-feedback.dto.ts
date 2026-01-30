import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class RequestFeedbackDto {
  @IsString()
  recordingId: string;

  @IsOptional()
  @IsString()
  lessonId?: string;
}

export class TranscribeAudioDto {
  @IsString()
  s3Key: string;
}

export class GenerateFeedbackDto {
  @IsString()
  transcript: string;

  @IsNumber()
  @Min(1)
  durationSeconds: number;

  @IsOptional()
  @IsString()
  lessonTitle?: string;

  @IsOptional()
  @IsString()
  lessonCategory?: string;

  @IsOptional()
  @IsString()
  practicePrompt?: string;

  @IsOptional()
  @IsString()
  exerciseType?: string;
}
