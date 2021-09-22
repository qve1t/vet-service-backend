import { userStub } from '../../../__tests__/stubs/user.stub';

export const LoginResponseMock = {
  cookie: jest.fn().mockReturnValue({
    cookie: jest.fn().mockReturnValue({
      json: jest
        .fn()
        .mockReturnValue({ isLogged: true, email: userStub.email }),
    }),
  }),
};

export const LogoutResponseMock = {
  clearCookie: jest.fn().mockReturnValue({
    clearCookie: jest.fn().mockReturnValue({
      json: jest.fn().mockReturnValue({ isLogged: false, email: '' }),
    }),
  }),
};
