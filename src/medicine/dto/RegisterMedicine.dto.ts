import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { RegisterMedicineInterface } from '../../interfaces/medicine';

export class RegisterMedicineDto implements RegisterMedicineInterface {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  count: number;

  @IsNumber()
  magazineCount: number;

  @IsOptional()
  @IsString()
  description: string | null;
}
