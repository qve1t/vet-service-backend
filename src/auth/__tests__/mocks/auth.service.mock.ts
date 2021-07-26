import { userStub } from '../stub/user.stub';

export const AuthServiceMock = {
  login: jest.fn().mockResolvedValue({ ok: true }),
  logout: jest.fn().mockResolvedValue({ ok: true }),
  isLogged: jest.fn().mockReturnValue({
    isLogged: true,
    email: userStub.email,
  }),
};
