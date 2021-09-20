import { userStubResponse } from '../../../__tests__/stubs/user.stub';

export const UserServiceMock = {
  returnAllUsers: jest.fn().mockResolvedValue([userStubResponse]),
  registerUser: jest.fn().mockResolvedValue(userStubResponse),
  changePassword: jest.fn().mockResolvedValue(userStubResponse),
};
