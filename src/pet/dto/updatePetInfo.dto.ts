import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PetInfoToUpdateInterface, PetSexes } from '../../interfaces/pet';

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

  @IsEnum(PetSexes)
  sex: PetSexes;

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

  @IsOptional()
  ownerId: string | null;
}
