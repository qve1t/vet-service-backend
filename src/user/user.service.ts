import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetUserResponse } from 'src/interfaces/user';
import { registerDto } from './dto/register.dto';
import { User } from './user.entity';
import { hashPassword } from '../utils/passwordHash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private filterUserObject(user: User): GetUserResponse {
    const { id, email } = user;
    return { id, email };
  }

  async returnAllUsers(): Promise<GetUserResponse[]> {
    const listOfUsers = await this.userRepository.find();

    return listOfUsers.map(this.filterUserObject);
  }

  async registerUser(registerData: registerDto): Promise<GetUserResponse> {
    const { email, password } = registerData;
    const hashedPassword = await hashPassword(password);

    const findUser = await this.userRepository.findOne({ email: email });

    if (findUser) {
      throw new HttpException('Email already registered', HttpStatus.CONFLICT);
    }

    const newUser = await this.userRepository.save({
      email: email,
      password: hashedPassword,
    });

    return this.filterUserObject(newUser);
  }
}
