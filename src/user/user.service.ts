import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserResponse } from 'src/interfaces/user';
import { registerDto } from './dto/register.dto';
import { User } from './user.entity';
import { hashPassword } from 'src/utils/apsswordHash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private filterUserObject(user: User): RegisterUserResponse {
    const { id, email } = user;
    return { id, email };
  }

  async returnAllUsers(): Promise<RegisterUserResponse[]> {
    const listOfUsers = await this.userRepository.find();

    return listOfUsers.map(this.filterUserObject);
  }

  async registerUser(registerData: registerDto): Promise<RegisterUserResponse> {
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
