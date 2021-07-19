import { userStub } from '../stub/user.stub';

export const UserRepositoryMock = {
  findOne: jest.fn().mockResolvedValue(userStub),
  save: jest.fn().mockResolvedValue(userStub),
};
