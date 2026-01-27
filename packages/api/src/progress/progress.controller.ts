import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('statistics')
@UseGuards(JwtAuthGuard)
export class ProgressController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getStatistics(@Request() req) {
    return this.usersService.getStatistics(req.user.id);
  }
}
