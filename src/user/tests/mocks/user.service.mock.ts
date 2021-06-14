import { GetUserResponse } from '../../../interfaces/user';

export const userMockResponse: GetUserResponse = {
  id: 'testid',
  email: 'testemail@test.com',
};

export const UserServiceMock = {
  returnAllUsers: jest.fn().mockResolvedValue([userMockResponse]),
  registerUser: jest.fn().mockResolvedValue(userMockResponse),
};
