import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { MedicineUpdateInterface } from '../../interfaces/medicine';

export class UpdateMedicineDto implements MedicineUpdateInterface {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsString()
  name: string | null;

  @IsOptional()
  @IsNumber()
  count: number | null;

  @IsOptional()
  @IsNumber()
  magazineCount: number | null;

  @IsOptional()
  @IsString()
  description: string | null;
}
