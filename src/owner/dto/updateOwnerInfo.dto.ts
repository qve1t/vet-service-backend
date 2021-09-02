import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { OwnerInfoToUpdateInterface } from '../../interfaces/owner';

export class updateOwnerInfoDto implements OwnerInfoToUpdateInterface {
  @IsString()
  @IsNotEmpty()
  id: string;

  @MaxLength(16)
  @IsOptional()
  phone: string | null;

  @IsEmail()
  @IsOptional()
  email: string | null;

  @IsOptional()
  address: string | null;
}
