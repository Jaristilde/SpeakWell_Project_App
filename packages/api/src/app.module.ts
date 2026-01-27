import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LessonsModule } from './lessons/lessons.module';
import { RecordingsModule } from './recordings/recordings.module';
import { ProgressModule } from './progress/progress.module';
import { CmsModule } from './cms/cms.module';
import { LearningPathModule } from './learning-path/learning-path.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ScheduleModule.forRoot(), // Enable cron jobs
    DatabaseModule,
    AuthModule,
    UsersModule,
    LessonsModule,
    RecordingsModule,
    ProgressModule,
    CmsModule,
    LearningPathModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
