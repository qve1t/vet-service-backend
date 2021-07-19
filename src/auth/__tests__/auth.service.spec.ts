import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth.service';
import { User } from '../../user/user.entity';
import { LoginDto } from '../dto/login.dto';
import { UserRepositoryMock } from './mocks/user.repository.mock';
import { userStub } from './stub/user.stub';
import { ResponseMock } from './mocks/response.mock';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: UserRepositoryMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    describe('when login is called', () => {
      let loginData: LoginDto;
      let response: any;
      let foundUser: User;
      let loginResponse: any;

      beforeEach(async () => {
        loginData = {
          email: 'testEmail@test.com',
          password: 'test1234',
        };
        foundUser = userStub;
        response = ResponseMock;
        jest.spyOn(bcrypt, 'compare');
        loginResponse = await service.login(loginData, response);
      });

      it('should check if user exist', () => {
        expect(userRepository.findOne).toBeCalledWith({
          email: loginData.email,
        });
      });

      it('should check if password matches', () => {
        expect(bcrypt.compare).toBeCalledWith(
          loginData.password,
          foundUser.password,
        );
      });
      it('should return successfull login response', () => {
        expect(loginResponse).toEqual({ ok: true });
      });
    });
  });

  describe('logout', () => {
    describe('when logout is called', () => {
      let user: User;
      let response: any;
      let logoutResponse: any;

      beforeEach(async () => {
        user = userStub;
        response = ResponseMock;
        logoutResponse = await service.logout(user, response);
      });

      it('should save changed user data', () => {
        expect(userRepository.save).toBeCalledWith({
          ...user,
          currentToken: null,
        });
      });

      it('should return successfull logout response', () => {
        expect(logoutResponse).toEqual({ ok: true });
      });
    });
  });
});
