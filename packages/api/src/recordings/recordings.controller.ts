import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { RecordingsService } from './recordings.service';
import { GetPresignedUrlDto, CreateRecordingDto } from './dto/create-recording.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('recordings')
@UseGuards(JwtAuthGuard)
export class RecordingsController {
  constructor(private recordingsService: RecordingsService) {}

  @Post('presigned-url')
  async getPresignedUrl(@Request() req, @Body() dto: GetPresignedUrlDto) {
    return this.recordingsService.getPresignedUrl(req.user.id, dto.contentType);
  }

  @Post()
  async createRecording(@Request() req, @Body() dto: CreateRecordingDto) {
    return this.recordingsService.createRecording(
      req.user.id,
      dto.s3Key,
      dto.durationSeconds,
      dto.transcript,
    );
  }

  @Get()
  async getUserRecordings(@Request() req) {
    return this.recordingsService.getUserRecordings(req.user.id);
  }
}
