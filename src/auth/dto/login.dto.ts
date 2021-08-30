import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { LoginUserInterface } from '../../interfaces/auth';

export class LoginDto implements LoginUserInterface {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
