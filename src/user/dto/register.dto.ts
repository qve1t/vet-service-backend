import { IsEmail, IsNotEmpty } from 'class-validator';

export class registerDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
