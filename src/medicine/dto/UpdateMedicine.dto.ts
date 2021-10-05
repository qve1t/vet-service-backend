import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { MedicineUpdateInterface } from 'src/interfaces/medicine';

export class UpdateMedicineDto implements MedicineUpdateInterface {
  @IsString()
  @IsNotEmpty()
  id: string;

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
