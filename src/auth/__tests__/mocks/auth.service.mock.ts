import { userStub } from '../stub/user.stub';

export const AuthServiceMock = {
  login: jest.fn().mockResolvedValue({ isLogged: true, email: userStub.email }),
  logout: jest.fn().mockResolvedValue({ isLogged: false, email: '' }),
  isLogged: jest.fn().mockReturnValue({
    isLogged: true,
    email: userStub.email,
  }),
};
