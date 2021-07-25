import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetUserResponse } from '../interfaces/user';
import { registerDto } from './dto/register.dto';
import { User } from './user.entity';
import { hashPassword } from '../utils/passwordHash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  filterUserObject(user: User): GetUserResponse {
    const { id, email } = user;
    return { id, email };
  }

  async returnAllUsers(): Promise<GetUserResponse[]> {
    const listOfUsers = await this.userRepository.find();

    return listOfUsers.map(this.filterUserObject);
  }

  async registerUser(registerData: registerDto): Promise<GetUserResponse> {
    const { email, password } = registerData;

    const findUser = await this.userRepository.findOne({ email: email });

    if (findUser) {
      throw new HttpException('Email already registered', HttpStatus.CONFLICT);
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await this.userRepository.save({
      email: email,
      password: hashedPassword,
    });

    return this.filterUserObject(newUser);
  }

  async changePassword(
    email: string,
    newPassword: string,
  ): Promise<GetUserResponse> {
    const foundUser = await this.userRepository.findOne({ email: email });

    if (!foundUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const hashedNewPassword = await hashPassword(newPassword);

    foundUser.password = hashedNewPassword;

    await this.userRepository.save(foundUser);

    return this.filterUserObject(foundUser);
  }
}
