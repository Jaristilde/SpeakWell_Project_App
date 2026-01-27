import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { LessonSchedulerService } from './lesson-scheduler.service';

@Module({
  controllers: [LessonsController],
  providers: [LessonsService, LessonSchedulerService],
  exports: [LessonsService, LessonSchedulerService],
})
export class LessonsModule {}
