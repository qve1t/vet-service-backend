import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { OwnerInfoToUpdate } from 'src/interfaces/owner';

export class updateOwnerInfoDto implements OwnerInfoToUpdate {
  @IsString()
  @IsNotEmpty()
  id: string;

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
