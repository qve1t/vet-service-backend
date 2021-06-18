import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class changePasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  newPassword: string;
}
