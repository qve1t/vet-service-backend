import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

import { RegisterUserInterface } from '../../interfaces/user';

export class registerDto implements RegisterUserInterface {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  password: string;
}
