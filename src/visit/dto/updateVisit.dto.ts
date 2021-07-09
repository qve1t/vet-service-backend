import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { VisitUPdateInterface } from '../../interfaces/visit';

export class UpdateVisitDto implements VisitUPdateInterface {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsDate()
  @IsOptional()
  dateTime: Date;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  note: string | null;

  @IsOptional()
  interview: string | null;

  @IsOptional()
  description: string | null;

  @IsOptional()
  healing: string | null;
}
