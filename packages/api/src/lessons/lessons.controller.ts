import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonSchedulerService } from './lesson-scheduler.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  StartLessonDto,
  CompleteLessonDto,
  UpdateProgressDto,
  SkipLessonDto,
  UpdatePreferencesDto,
} from './dto';

@Controller('lessons')
@UseGuards(JwtAuthGuard)
export class LessonsController {
  constructor(
    private lessonsService: LessonsService,
    private schedulerService: LessonSchedulerService,
  ) {}

  // ==================== DAILY LESSON SCHEDULING ====================

  /**
   * GET /lessons/today
   * Get today's assigned lesson with scheduling info
   */
  @Get('today')
  async getTodayLesson(@Request() req) {
    return this.schedulerService.getTodayLesson(req.user.id);
  }

  /**
   * GET /lessons/upcoming
   * Get next 7 days of planned lessons
   */
  @Get('upcoming')
  async getUpcomingLessons(@Request() req) {
    return this.schedulerService.getUpcomingLessons(req.user.id);
  }

  /**
   * POST /lessons/skip
   * Skip today's lesson with a reason
   */
  @Post('skip')
  async skipTodayLesson(@Request() req, @Body() dto: SkipLessonDto) {
    return this.schedulerService.skipLesson(req.user.id, dto);
  }

  /**
   * GET /lessons/preferences
   * Get user's scheduling preferences
   */
  @Get('preferences')
  async getPreferences(@Request() req) {
    return this.schedulerService.getUserPreferences(req.user.id);
  }

  /**
   * PUT /lessons/preferences
   * Update user's scheduling preferences
   */
  @Put('preferences')
  async updatePreferences(@Request() req, @Body() dto: UpdatePreferencesDto) {
    return this.schedulerService.updateUserPreferences(req.user.id, dto);
  }

  /**
   * POST /lessons/assign-now
   * Force assign a new lesson for today (admin/testing)
   */
  @Post('assign-now')
  async assignLessonNow(@Request() req) {
    return this.schedulerService.assignLessonNow(req.user.id);
  }

  // ==================== CATEGORIES ====================

  /**
   * GET /lessons/categories
   * List all available categories with metadata
   */
  @Get('categories')
  async getCategories() {
    return this.lessonsService.getCategories();
  }

  /**
   * GET /lessons/categories/:category
   * Get lessons by category
   */
  @Get('categories/:category')
  async getLessonsByCategory(@Param('category') category: string) {
    return this.lessonsService.getLessonsByCategory(category);
  }

  // ==================== USER LESSONS & STATS ====================

  /**
   * GET /lessons/user
   * Get all lessons with user's progress
   */
  @Get('user')
  async getUserLessons(@Request() req) {
    return this.lessonsService.getUserLessons(req.user.id);
  }

  /**
   * GET /lessons/stats
   * Get user's lesson statistics
   */
  @Get('stats')
  async getUserStats(@Request() req) {
    return this.lessonsService.getUserStats(req.user.id);
  }

  // ==================== ALL LESSONS ====================

  /**
   * GET /lessons
   * Get all published lessons (summary view)
   */
  @Get()
  async getAllLessons() {
    return this.lessonsService.getAllLessons();
  }

  // ==================== SINGLE LESSON ====================

  /**
   * GET /lessons/:id
   * Get full lesson content by ID
   */
  @Get(':id')
  async getLessonById(@Param('id') id: string) {
    return this.lessonsService.getLessonById(id);
  }

  // ==================== LESSON PROGRESS ====================

  /**
   * POST /lessons/:id/start
   * Mark a lesson as started
   */
  @Post(':id/start')
  async startLesson(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: StartLessonDto,
  ) {
    return this.lessonsService.startLesson(req.user.id, id, dto);
  }

  /**
   * PATCH /lessons/:id/progress
   * Update lesson progress (section, time spent, etc.)
   */
  @Patch(':id/progress')
  async updateProgress(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateProgressDto,
  ) {
    return this.lessonsService.updateProgress(req.user.id, id, dto);
  }

  /**
   * POST /lessons/:id/complete
   * Mark a lesson as completed with scores
   */
  @Post(':id/complete')
  async completeLesson(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: CompleteLessonDto,
  ) {
    return this.lessonsService.completeLesson(req.user.id, id, dto);
  }
}
