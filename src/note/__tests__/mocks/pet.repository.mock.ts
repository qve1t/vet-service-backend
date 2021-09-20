import { petStub } from '../../../__tests__/stubs/pet.stub';

export const PetRepositoryMock = {
  findOne: jest.fn().mockResolvedValue(petStub),
};
