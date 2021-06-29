import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PetInterface, PetSexes } from 'src/interfaces/pet';

export class registerPetDto implements PetInterface {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  chipId: string | null;

  @IsString()
  @IsOptional()
  tatooId: string | null;

  @IsString()
  type: string;

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
}
