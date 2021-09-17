import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { decode, JwtPayload } from 'jsonwebtoken';
import { COOKIES_NAMES, COOKIES_OPTIONS } from '../auth/cookiesData';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RefreshTokenAuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getRequest();
    try {
      const refreshToken = request.cookies.refreshToken;

      const { id, exp } = decode(refreshToken) as JwtPayload;

      if (Date.now() >= exp * 1000) {
        throw new UnauthorizedException('Refresh token expired');
      }

      const user = await this.userRepository.findOne({ refreshToken: id });

      if (!user) {
        throw new UnauthorizedException('Refresh token not valid');
      }

      request.user = user;

      return true;
    } catch (error) {
      response
        .clearCookie(COOKIES_NAMES.JWT, COOKIES_OPTIONS)
        .clearCookie(COOKIES_NAMES.REFRESH, COOKIES_OPTIONS);
      return false;
    }
  }
}
