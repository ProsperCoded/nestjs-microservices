import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'apps/auth/src/users/dto/create-user.dto';

@Injectable()
export class UsersService {
  createUser(createUserDto: CreateUserDto) {
    return 'User created';
  }
}
