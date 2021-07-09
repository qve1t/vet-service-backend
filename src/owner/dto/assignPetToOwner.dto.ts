import { IsNotEmpty, IsString } from 'class-validator';

export class assignPetToOwnerDto {
  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @IsString()
  @IsNotEmpty()
  petId: string;
}
