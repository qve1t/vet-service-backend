import {
  getOwnerListResponse,
  ownerStub,
  ownerSuccessResponse,
} from '../../../__tests__/stubs/owner.stub';

export const OwnerServiceMock = {
  registerNewOwner: jest.fn().mockResolvedValue(ownerSuccessResponse),
  updateOwnerInfo: jest.fn().mockResolvedValue(ownerSuccessResponse),
  getOwnerDetails: jest.fn().mockResolvedValue(ownerStub),
  getOwnersList: jest.fn().mockResolvedValue(getOwnerListResponse),
  deleteOwner: jest.fn().mockResolvedValue(ownerSuccessResponse),
  assignPetToOwner: jest.fn().mockResolvedValue(ownerSuccessResponse),
};
