import { PetSexes } from '../../../interfaces/pet';
import { Pet } from '../../../pet/pet.entity';

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
  userId: 'test',
};
