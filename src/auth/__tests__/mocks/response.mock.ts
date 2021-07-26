import { userStub } from '../stub/user.stub';

export const LoginResponseMock = {
  cookie: jest.fn().mockReturnValue(null),
  json: jest.fn().mockReturnValue({ isLogged: true, email: userStub.email }),
};

export const LogoutResponseMock = {
  cookie: jest.fn().mockReturnValue(null),
  json: jest.fn().mockReturnValue({ isLogged: false, email: '' }),
};
