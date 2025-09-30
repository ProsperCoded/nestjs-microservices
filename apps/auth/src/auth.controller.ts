import { Controller, Get, UseGuards, Post, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { CurrentUser } from './decorator/current-user.decorator';
import { UserDocument } from './users/schemas/user.schema';
import type { Response } from 'express';
import { JwtAuthGuard } from 'apps/auth/src/guards/jwt-auth.gaurd';
// import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwt = await this.authService.login(user, response);
    response.send(jwt);
  }
}
