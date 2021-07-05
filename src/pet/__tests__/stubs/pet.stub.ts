import {
  PetListInterface,
  PetListResponse,
  PetRegisterResponse,
  PetSexes,
} from '../../../interfaces/pet';
import { Pet } from '../../../pet/pet.entity';

export const petStub: Pet = {
  id: 'testPteId',
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
  owner: null,
  visits: null,
};

export const petsListStub: PetListInterface[] = [
  {
    id: 'testPteId',
    name: 'testPet',
    type: 'dog',
    owner: null,
  },
];

export const petSuccessResponse: PetRegisterResponse = {
  id: 'testPteId',
  status: 'ok',
};

export const getPetListResponse: PetListResponse = {
  results: petsListStub,
  count: 1,
};
