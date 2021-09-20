import {
  petSuccessResponse,
  petStub,
  getPetListResponse,
} from '../../../__tests__/stubs/pet.stub';

export const PetServiceMock = {
  registerNewPet: jest.fn().mockResolvedValue(petSuccessResponse),
  updatePetInfo: jest.fn().mockResolvedValue(petSuccessResponse),
  getPetDetails: jest.fn().mockResolvedValue(petStub),
  getPetsList: jest.fn().mockResolvedValue(getPetListResponse),
  deletePet: jest.fn().mockResolvedValue(petSuccessResponse),
  assignOwnerToPet: jest.fn().mockResolvedValue(petSuccessResponse),
};
