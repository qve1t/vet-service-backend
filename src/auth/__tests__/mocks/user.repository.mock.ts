import { userStub } from '../../../__tests__/stubs/user.stub';

export const UserRepositoryMock = {
  findOne: jest.fn().mockResolvedValue(userStub),
  save: jest.fn().mockResolvedValue(userStub),
};
