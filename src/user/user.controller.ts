import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserObject } from '../decorators/userObject.decorator';

import { GetUserResponse } from '../interfaces/user';
import { registerDto } from './dto/register.dto';
import { User } from './user.entity';
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
  @UseGuards(AuthGuard('jwt'))
  async changePassword(
    @Body() newPassword: string,
    @UserObject() user: User,
  ): Promise<GetUserResponse> {
    return await this.userSrevice.changePassword(user.email, newPassword);
  }
}
