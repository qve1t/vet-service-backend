import { userStub } from '../../../__tests__/stubs/user.stub';

export const AuthServiceMock = {
  login: jest.fn().mockResolvedValue({ isLogged: true, email: userStub.email }),
  logout: jest.fn().mockResolvedValue({ isLogged: false, email: '' }),
  refreshUsersTokens: jest
    .fn()
    .mockResolvedValue({ isLogged: true, email: userStub.email }),
  isLogged: jest.fn().mockReturnValue({
    isLogged: true,
    email: userStub.email,
  }),
};
