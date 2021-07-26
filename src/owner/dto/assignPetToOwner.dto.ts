import { IsNotEmpty, IsString } from 'class-validator';

import { AssignPetToOwnerInterface } from '../../interfaces/owner';

export class assignPetToOwnerDto implements AssignPetToOwnerInterface {
  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @IsString()
  @IsNotEmpty()
  petId: string;
}
