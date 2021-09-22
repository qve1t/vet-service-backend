import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';
import { JwtPayload } from './jwt.strategy';
import { LoginDto } from './dto/login.dto';
import { IsUserLoggedResponse } from '../interfaces/auth';
import {
  COOKIES_NAMES,
  COOKIES_OPTIONS,
  COOKIE_EXPIRE_TIME,
} from './cookiesData';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  private async generateUnusedToken(
    user: User,
    tokenName: 'currentToken' | 'refreshToken',
  ): Promise<string> {
    //gemerate new token and check if none of the users has it
    let token: string;
    let userWithGeneratedToken: User;
    do {
      token = uuid();
      userWithGeneratedToken = await this.userRepository.findOne({
        [tokenName]: token,
      });
    } while (!!userWithGeneratedToken);
    user[tokenName] = token;
    await this.userRepository.save(user);

    return token;
  }

  private createJwtToken(currentTokenId: string, expireTime: number): string {
    //create new jwt
    const payload: JwtPayload = { id: currentTokenId };
    const accessToken = sign(payload, 'secretKeyToChange', {
      expiresIn: expireTime,
    });
    return accessToken;
  }

  async login(loginData: LoginDto, res: Response): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        email: loginData.email,
      });

      if (!user) {
        return res.status(401).json({ error: 'Invalid login data' });
      }

      const matchPassword = await bcrypt.compare(
        loginData.password,
        user.password,
      );

      if (!matchPassword) {
        return res.status(401).json({ error: 'Invalid login data' });
      }

      const token = this.createJwtToken(
        await this.generateUnusedToken(user, 'currentToken'),
        COOKIE_EXPIRE_TIME.JWT,
      );

      const refreshToken = this.createJwtToken(
        await this.generateUnusedToken(user, 'refreshToken'),
        COOKIE_EXPIRE_TIME.REFRESH,
      );

      return res
        .cookie(COOKIES_NAMES.JWT, token, COOKIES_OPTIONS)
        .cookie(COOKIES_NAMES.REFRESH, refreshToken, COOKIES_OPTIONS)
        .json({ isLogged: true, email: user.email });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async logout(user: User, res: Response): Promise<any> {
    try {
      user.currentToken = null;
      user.refreshToken = null;
      await this.userRepository.save(user);

      return res
        .clearCookie(COOKIES_NAMES.JWT, COOKIES_OPTIONS)
        .clearCookie(COOKIES_NAMES.REFRESH, COOKIES_OPTIONS)
        .json({ isLogged: false, email: '' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async refreshUsersTokens(user: User, res: Response): Promise<any> {
    try {
      const token = this.createJwtToken(
        await this.generateUnusedToken(user, 'currentToken'),
        COOKIE_EXPIRE_TIME.JWT,
      );

      const refreshToken = this.createJwtToken(
        await this.generateUnusedToken(user, 'refreshToken'),
        COOKIE_EXPIRE_TIME.REFRESH,
      );

      return res
        .cookie(COOKIES_NAMES.JWT, token, COOKIES_OPTIONS)
        .cookie(COOKIES_NAMES.REFRESH, refreshToken, COOKIES_OPTIONS)
        .json({ isLogged: true, email: user.email });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  isLogged(user: User): IsUserLoggedResponse {
    return {
      isLogged: true,
      email: user.email,
    };
  }
}
