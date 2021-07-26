import { IsNotEmpty, IsString } from 'class-validator';

import { AssignOwnerToPetInterface } from '../../interfaces/pet';

export class assignOwnerToPetDto implements AssignOwnerToPetInterface {
  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @IsString()
  @IsNotEmpty()
  petId: string;
}
