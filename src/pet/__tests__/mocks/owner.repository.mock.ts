import { ownerStub } from '../../../__tests__/stubs/owner.stub';

export const OwnerRepositoryMock = {
  findOne: jest.fn().mockResolvedValue(ownerStub),
};
