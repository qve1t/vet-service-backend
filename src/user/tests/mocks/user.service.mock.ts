import { userStubResponse } from '../stubs/user.stub';

export const UserServiceMock = {
  returnAllUsers: jest.fn().mockResolvedValue([userStubResponse]),
  registerUser: jest.fn().mockResolvedValue(userStubResponse),
};
