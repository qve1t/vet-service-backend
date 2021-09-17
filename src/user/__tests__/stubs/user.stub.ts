import { User } from '../../user.entity';
import { GetUserResponse } from '../../../interfaces/user';

export const userStubResponse: GetUserResponse = {
  id: 'testid',
  email: 'testemail@test.com',
};

export const userStub: User = {
  id: 'asd123',
  email: 'testemail123@test.com',
  password: 'testpassword',
  currentToken: 'asd',
  refreshToken: 'aaa',
};

export const secondUserStub: User = {
  id: '1234qwer',
  email: 'testemail1234qwer@test.com',
  password: 'testpassword',
  currentToken: '1234',
  refreshToken: 'aaa',
};
