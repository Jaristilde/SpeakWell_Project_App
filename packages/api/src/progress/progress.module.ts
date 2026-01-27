import { Module } from '@nestjs/common';
import { ProgressController } from './progress.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ProgressController],
})
export class ProgressModule {}
