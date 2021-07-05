import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PetInfoToUpdateInterface } from '../../interfaces/pet';

export class updatePetInfoDto implements PetInfoToUpdateInterface {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  chipId: string | null;

  @IsString()
  @IsOptional()
  tatooId: string | null;

  @IsString()
  @IsOptional()
  race: string | null;

  @IsNumber()
  @IsOptional()
  age: number | null;

  @IsNumber()
  @IsOptional()
  weight: number | null;

  @IsNumber()
  @IsOptional()
  height: number | null;

  @IsNumber()
  @IsOptional()
  length: number | null;

  @IsOptional()
  diseases: string | null;

  @IsOptional()
  others: string | null;
}
