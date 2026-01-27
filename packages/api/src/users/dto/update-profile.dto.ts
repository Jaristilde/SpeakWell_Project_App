import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  ageGroup?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  learningGoals?: string[];
}

export class CompleteOnboardingDto {
  @IsString()
  ageGroup: string;

  @IsArray()
  @IsString({ each: true })
  learningGoals: string[];
}
