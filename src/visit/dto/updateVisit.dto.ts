import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  VisitUPdateInterface,
  VisitUpdateSingleMedicine,
} from '../../interfaces/visit';

class SingleMedicine implements VisitUpdateSingleMedicine {
  @IsString()
  @IsNotEmpty()
  medicineId: string;

  @IsNumber()
  count: number;
}

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
  @IsOptional()
  note: string | null;

  @IsOptional()
  interview: string | null;

  @IsOptional()
  description: string | null;

  @IsOptional()
  healing: string | null;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SingleMedicine)
  medicines: SingleMedicine[] | null;
}
