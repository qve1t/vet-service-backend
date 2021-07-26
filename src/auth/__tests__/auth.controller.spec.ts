import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { IsUserLoggedResponse } from '../../interfaces/auth';
import { User } from '../../user/user.entity';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/login.dto';
import { AuthServiceMock } from './mocks/auth.service.mock';
import { userStub } from './stub/user.stub';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(AuthServiceMock)
      .compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('loginUser', () => {
    describe('when loginUser is called', () => {
      let loginData: LoginDto;
      let response: Response;
      let loginResponse: any;

      beforeEach(async () => {
        loginData = {
          email: 'testEmail@test.com',
          password: 'test1234',
        };
        loginResponse = await controller.loginUser(loginData, response);
      });

      it('should call AuthService', () => {
        expect(service.login).toBeCalledWith(loginData, response);
      });

      it('should return successfull login response', () => {
        expect(loginResponse).toEqual({ ok: true });
      });
    });
  });

  describe('logoutUser', () => {
    describe('when logoutUser is called', () => {
      let user: User;
      let response: Response;
      let logoutResponse: any;

      beforeEach(async () => {
        user = userStub;
        logoutResponse = await controller.logoutUser(user, response);
      });

      it('should call AuthService', () => {
        expect(service.logout).toBeCalledWith(user, response);
      });

      it('should return successfull logout response', () => {
        expect(logoutResponse).toEqual({ ok: true });
      });
    });
  });

  describe('isUserLogged', () => {
    describe('when isUserLogged is called', () => {
      let user: User;
      let isUserLoggedResponse: IsUserLoggedResponse;

      beforeEach(() => {
        user = userStub;
        isUserLoggedResponse = controller.isUserLogged(user);
      });

      it('should return logged user response', () => {
        expect(isUserLoggedResponse).toEqual({
          isLogged: true,
          email: user.email,
        });
      });
    });
  });
});
