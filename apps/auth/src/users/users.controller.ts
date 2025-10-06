import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'apps/auth/src/guards/jwt-auth.guard';
import { CreateUserDto } from 'apps/auth/src/users/dto/create-user.dto';
import { UserDocument } from 'apps/auth/src/users/schemas/user.schema';
import { UsersService } from 'apps/auth/src/users/users.service';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async me(@CurrentUser() user: UserDocument) {
    return user;
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
