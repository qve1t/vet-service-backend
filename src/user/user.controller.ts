import { Body, Controller, Get, Post } from '@nestjs/common';

import { RegisterUserResponse } from '../interfaces/user';
import { registerDto } from './dto/register.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userSrevice: UserService) {}

  @Get('/')
  async getAllUsers(): Promise<RegisterUserResponse[]> {
    return await this.userSrevice.returnAllUsers();
  }

  //add validation pipe and tests
  @Post('/register')
  async registerUser(
    @Body() registerData: registerDto,
  ): Promise<RegisterUserResponse> {
    return await this.userSrevice.registerUser(registerData);
  }
}
