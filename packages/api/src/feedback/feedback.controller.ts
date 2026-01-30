import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { RequestFeedbackDto } from './dto/request-feedback.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('feedback')
@UseGuards(JwtAuthGuard)
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  /**
   * Request AI feedback for a recording
   * Initiates async processing and returns immediately with a feedback ID
   */
  @Post('request')
  async requestFeedback(@Request() req, @Body() dto: RequestFeedbackDto) {
    return this.feedbackService.requestFeedback(
      req.user.id,
      dto.recordingId,
      dto.lessonId,
    );
  }

  /**
   * Get feedback by ID (poll this while status is 'pending' or 'processing')
   */
  @Get(':id')
  async getFeedback(@Request() req, @Param('id') feedbackId: string) {
    return this.feedbackService.getFeedback(req.user.id, feedbackId);
  }

  /**
   * Get feedback for a specific recording
   */
  @Get('recording/:recordingId')
  async getFeedbackByRecording(
    @Request() req,
    @Param('recordingId') recordingId: string,
  ) {
    const feedback = await this.feedbackService.getFeedbackByRecording(
      req.user.id,
      recordingId,
    );
    return feedback || { status: 'not_found' };
  }

  /**
   * Get user's feedback history
   */
  @Get()
  async getUserFeedbackHistory(
    @Request() req,
    @Query('limit') limit?: string,
  ) {
    const limitNum = limit ? parseInt(limit, 10) : 20;
    return this.feedbackService.getUserFeedbackHistory(req.user.id, limitNum);
  }

  /**
   * Get user's progress statistics based on feedback history
   */
  @Get('stats/progress')
  async getUserProgressStats(@Request() req) {
    return this.feedbackService.getUserProgressStats(req.user.id);
  }
}
