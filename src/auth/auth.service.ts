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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  private async generateUnusedToken(user: User): Promise<string> {
    //gemerate new token and check if none of the users has it
    let token: string;
    let userWithGeneratedToken: User;
    do {
      token = uuid();
      userWithGeneratedToken = await this.userRepository.findOne({
        currentToken: token,
      });
    } while (!!userWithGeneratedToken);
    user.currentToken = token;
    await this.userRepository.save(user);

    return token;
  }

  private createJwtToken(currentTokenId: string): string {
    //create new jwt
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = 60 * 60 * 24;
    const accessToken = sign(payload, 'secretKeyToChange', {
      expiresIn: expiresIn,
    });
    return accessToken;
  }

  async login(loginData: LoginDto, res: Response): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        email: loginData.email,
      });

      if (!user) {
        return res.json({ error: 'Invalid login data' });
      }

      const matchPassword = await bcrypt.compare(
        loginData.password,
        user.password,
      );

      if (!matchPassword) {
        return res.json({ error: 'Invalid login data' });
      }

      const token = this.createJwtToken(await this.generateUnusedToken(user));

      return res
        .cookie('jwt', token, {
          secure: false,
          domain: 'localhost',
          httpOnly: true,
        })
        .json({ ok: true });
    } catch (err) {
      return res.json({ error: err.message });
    }
  }

  async logout(user: User, res: Response): Promise<any> {
    try {
      user.currentToken = null;
      await this.userRepository.save(user);

      return res
        .clearCookie('jwt', {
          secure: false,
          domain: 'localhost',
          httpOnly: true,
        })
        .json({ ok: true });
    } catch (err) {
      return res.json({ error: err.message });
    }
  }
}
