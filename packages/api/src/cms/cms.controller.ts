import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CmsService } from './cms.service';
import {
  CreateLessonDto,
  UpdateLessonDto,
  CreateTopicDto,
  UpdateTopicDto,
  CreateExerciseDto,
  UpdateExerciseDto,
} from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('cms')
@UseGuards(JwtAuthGuard)
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  // ==================== STATS ====================

  @Get('stats')
  async getStats() {
    return this.cmsService.getCmsStats();
  }

  // ==================== LESSONS ====================

  @Post('lessons')
  async createLesson(@Body() dto: CreateLessonDto) {
    return this.cmsService.createLesson(dto);
  }

  @Get('lessons')
  async getAllLessons() {
    return this.cmsService.getAllLessons();
  }

  @Get('lessons/:id')
  async getLessonById(@Param('id') id: string) {
    return this.cmsService.getLessonById(id);
  }

  @Put('lessons/:id')
  async updateLesson(@Param('id') id: string, @Body() dto: UpdateLessonDto) {
    return this.cmsService.updateLesson(id, dto);
  }

  @Delete('lessons/:id')
  async deleteLesson(@Param('id') id: string) {
    return this.cmsService.deleteLesson(id);
  }

  // ==================== TOPICS ====================

  @Post('topics')
  async createTopic(@Body() dto: CreateTopicDto) {
    return this.cmsService.createTopic(dto);
  }

  @Get('topics')
  async getAllTopics() {
    return this.cmsService.getAllTopics();
  }

  @Get('topics/:id')
  async getTopicById(@Param('id') id: string) {
    return this.cmsService.getTopicById(id);
  }

  @Put('topics/:id')
  async updateTopic(@Param('id') id: string, @Body() dto: UpdateTopicDto) {
    return this.cmsService.updateTopic(id, dto);
  }

  @Delete('topics/:id')
  async deleteTopic(@Param('id') id: string) {
    return this.cmsService.deleteTopic(id);
  }

  // ==================== EXERCISES ====================

  @Post('exercises')
  async createExercise(@Body() dto: CreateExerciseDto) {
    return this.cmsService.createExercise(dto);
  }

  @Get('exercises')
  async getAllExercises() {
    return this.cmsService.getAllExercises();
  }

  @Get('exercises/:id')
  async getExerciseById(@Param('id') id: string) {
    return this.cmsService.getExerciseById(id);
  }

  @Put('exercises/:id')
  async updateExercise(@Param('id') id: string, @Body() dto: UpdateExerciseDto) {
    return this.cmsService.updateExercise(id, dto);
  }

  @Delete('exercises/:id')
  async deleteExercise(@Param('id') id: string) {
    return this.cmsService.deleteExercise(id);
  }
}
