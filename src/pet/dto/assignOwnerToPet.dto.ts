import { IsNotEmpty, IsString } from 'class-validator';

export class assignOwnerToPetDto {
  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @IsString()
  @IsNotEmpty()
  petId: string;
}
