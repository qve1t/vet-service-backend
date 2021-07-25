import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { User } from '../user/user.entity';
import { UserObject } from '../decorators/userObject.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { IsLoggedUser } from '../interfaces/auth';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('login')
  async loginUser(
    @Body() loginData: LoginDto,
    @Res() res: Response,
  ): Promise<any> {
    return await this.authService.login(loginData, res);
  }

  @Get('/logout')
  @UseGuards(AuthGuard('jwt'))
  async logoutUser(
    @UserObject() user: User,
    @Res() res: Response,
  ): Promise<any> {
    return await this.authService.logout(user, res);
  }

  @Get('/isLogged')
  @UseGuards(AuthGuard('jwt'))
  async isUserLogged(@UserObject() user: User): Promise<IsLoggedUser> {
    return await this.authService.isLogged(user);
  }
}
