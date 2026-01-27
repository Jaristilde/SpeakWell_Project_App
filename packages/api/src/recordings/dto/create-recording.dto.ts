import { IsString, IsNumber, IsOptional } from 'class-validator';

export class GetPresignedUrlDto {
  @IsString()
  contentType: string;
}

export class CreateRecordingDto {
  @IsString()
  s3Key: string;

  @IsNumber()
  durationSeconds: number;

  @IsString()
  @IsOptional()
  transcript?: string;
}
