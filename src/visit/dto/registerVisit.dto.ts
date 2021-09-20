import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { VisitRegisterInterface } from '../../interfaces/visit';

export class RegisterVisitDto implements VisitRegisterInterface {
  @IsDate()
  dateTime: Date;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  note: string | null;

  @IsOptional()
  interview: string | null;

  @IsOptional()
  description: string | null;

  @IsOptional()
  healing: string | null;

  @IsString()
  @IsNotEmpty()
  petId: string;

  @IsString()
  @IsNotEmpty()
  ownerId: string;
}
