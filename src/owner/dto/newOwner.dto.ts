import { IsEmail, IsNotEmpty, IsPhoneNumber, MaxLength } from 'class-validator';

export class registerDto {
  @IsNotEmpty()
  @MaxLength(64)
  name: string;

  @IsNotEmpty()
  @MaxLength(64)
  surname: string;

  @IsPhoneNumber()
  @MaxLength(16)
  phone: string;

  @IsEmail()
  email: string;
}
