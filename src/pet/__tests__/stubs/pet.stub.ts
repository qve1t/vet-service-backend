import {
  PetListInterface,
  PetListResponse,
  PetRegisterResponse,
  PetSexes,
} from '../../../interfaces/pet';
import { Pet } from '../../pet.entity';

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
  owner: null,
  visits: null,
};

export const petsListStub: PetListInterface[] = [
  {
    id: 'testPetId',
    name: 'testPet',
    type: 'dog',
    owner: null,
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
