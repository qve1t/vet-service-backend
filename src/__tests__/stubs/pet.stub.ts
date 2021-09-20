import {
  PetListInterface,
  PetListResponse,
  PetRegisterResponse,
  PetSexes,
} from '../../interfaces/pet';
import { Pet } from '../../pet/pet.entity';
import { ownerStub } from './owner.stub';
import { userStub } from './user.stub';

export const petStub: Pet = {
  id: 'testPetId',
  name: 'testPet',
  type: 'dog',
  sex: PetSexes.MALE,
  chipId: null,
  tatooId: null,
  race: null,
  age: null,
  weight: null,
  height: null,
  length: null,
  diseases: null,
  others: null,
  notes: null,
  owner: null,
  visits: null,
  userId: userStub.id,
};

export const petsListStub: PetListInterface[] = [
  {
    id: 'testPetId',
    name: 'testPet',
    type: 'dog',
    owner: ownerStub,
  },
];

export const petSuccessResponse: PetRegisterResponse = {
  id: petStub.id,
  status: 'ok',
};

export const getPetListResponse: PetListResponse = {
  results: petsListStub,
  count: 1,
};
