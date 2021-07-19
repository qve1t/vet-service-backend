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
  async logoutUser(@UserObject() user: User, @Res() res: Response) {
    console.log(user);
    return await this.authService.logout(user, res);
  }
}
