import { Test, TestingModule } from '@nestjs/testing';
import { GetUserResponse } from '../../interfaces/user';
import { changePasswordDto } from '../dto/changePassword.dto';
import { registerDto } from '../dto/register.dto';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { UserServiceMock } from './mocks/user.service.mock';
import { userStubResponse } from './stubs/user.stub';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(UserServiceMock)
      .compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUsers', () => {
    describe('when getAllUsers is called', () => {
      let users: GetUserResponse[];

      beforeEach(async () => {
        users = await controller.getAllUsers();
      });

      it('should call UserService', () => {
        expect(service.returnAllUsers).toBeCalledWith();
      });

      it('should return an array of users', () => {
        expect(users).toEqual([userStubResponse]);
      });
    });
  });
  describe('registerUser', () => {
    describe('when registerUser is called', () => {
      let user: GetUserResponse;
      let registerUserDto: registerDto;

      beforeEach(async () => {
        registerUserDto = {
          email: userStubResponse.email,
          password: 'testpassword',
        };
        user = await controller.registerUser(registerUserDto);
      });

      it('it should call UserService', () => {
        expect(service.registerUser).toBeCalledWith(registerUserDto);
      });

      it('it should return a response with user', () => {
        expect(user).toEqual(userStubResponse);
      });
    });
  });
  describe('changePassword', () => {
    describe('when changePassword is called', () => {
      let user: GetUserResponse;
      let changePasswordDto: changePasswordDto;

      beforeEach(async () => {
        changePasswordDto = {
          email: userStubResponse.email,
          newPassword: 'testnewpassword',
        };
        user = await controller.changePassword(changePasswordDto);
      });

      it('it should call UserService', () => {
        expect(service.changePassword).toBeCalledWith(changePasswordDto);
      });

      it('it should return a response with user', () => {
        expect(user).toEqual(userStubResponse);
      });
    });
  });
});
