import { Body, Controller, Get, Inject, Patch, Post } from '@nestjs/common';

import { GetUserResponse } from '../interfaces/user';
import { changePasswordDto } from './dto/changePassword.dto';
import { registerDto } from './dto/register.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private readonly userSrevice: UserService) {}

  @Get('/')
  async getAllUsers(): Promise<GetUserResponse[]> {
    return await this.userSrevice.returnAllUsers();
  }

  @Post('/register')
  async registerUser(
    @Body() registerData: registerDto,
  ): Promise<GetUserResponse> {
    return await this.userSrevice.registerUser(registerData);
  }

  @Patch('/change_password')
  async changePassword(
    @Body() changePasswordData: changePasswordDto,
  ): Promise<GetUserResponse> {
    return await this.userSrevice.changePassword(changePasswordData);
  }
}
