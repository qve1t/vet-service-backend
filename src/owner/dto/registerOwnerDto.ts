import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  MaxLength,
} from 'class-validator';
import { OwnerInterface } from 'src/interfaces/owner';

export class registerOwnerDto implements OwnerInterface {
  @IsNotEmpty()
  @MaxLength(64)
  name: string;

  @IsNotEmpty()
  @MaxLength(64)
  surname: string;

  @IsPhoneNumber()
  @MaxLength(16)
  @IsOptional()
  phone: string | null;

  @IsEmail()
  @IsOptional()
  email: string | null;

  @IsOptional()
  address: string | null;
}
