import { ownerStub } from '../stubs/owner.stub';

export const OwnerRepositoryMock = {
  findOne: jest.fn().mockResolvedValue(ownerStub),
};
