import { userStub, secondUserStub } from '../../../__tests__/stubs/user.stub';

export const UserRepositoryMock = {
  find: jest.fn().mockResolvedValue([userStub]),
  findOne: jest.fn().mockResolvedValue(userStub),
  save: jest.fn().mockResolvedValue(secondUserStub),
};
