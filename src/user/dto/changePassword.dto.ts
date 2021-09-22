import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

import { ChangePasswordUserInterface } from '../../interfaces/user';

export class changePasswordDto implements ChangePasswordUserInterface {
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  oldPassword: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  newPassword: string;
}
