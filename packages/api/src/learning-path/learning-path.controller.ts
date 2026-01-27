import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LearningPathService } from './learning-path.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  GeneratePathDto,
  AdjustPathDto,
  UpdatePathProgressDto,
} from './dto';

@Controller('learning-path')
@UseGuards(JwtAuthGuard)
export class LearningPathController {
  constructor(private learningPathService: LearningPathService) {}

  /**
   * GET /learning-path
   * Get user's current learning path with full details
   */
  @Get()
  async getUserLearningPath(@Request() req) {
    return this.learningPathService.getUserLearningPath(req.user.id);
  }

  /**
   * GET /learning-path/available
   * Get all available path templates
   */
  @Get('available')
  async getAvailablePaths(@Request() req) {
    return this.learningPathService.getAvailablePaths(req.user.id);
  }

  /**
   * POST /learning-path/generate
   * Generate a new learning path from onboarding goals
   */
  @Post('generate')
  async generateLearningPath(@Request() req, @Body() dto: GeneratePathDto) {
    return this.learningPathService.generateLearningPath(req.user.id, dto);
  }

  /**
   * PUT /learning-path/adjust
   * Manually adjust the learning path
   */
  @Put('adjust')
  async adjustPath(@Request() req, @Body() dto: AdjustPathDto) {
    return this.learningPathService.adjustPath(req.user.id, dto);
  }

  /**
   * POST /learning-path/progress
   * Update progress on a lesson (triggers adaptive adjustments)
   */
  @Post('progress')
  async updateProgress(@Request() req, @Body() dto: UpdatePathProgressDto) {
    return this.learningPathService.updateLessonProgress(req.user.id, dto);
  }
}
