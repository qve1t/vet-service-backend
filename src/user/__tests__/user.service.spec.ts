import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { GetUserResponse } from '../../interfaces/user';
import { registerDto } from '../dto/register.dto';
import { User } from '../user.entity';
import { UserService } from '../user.service';
import * as hashingUtil from '../../utils/passwordHash';
import { UserRepositoryMock } from './mocks/user.repository.mock';
import { userStub, secondUserStub } from '../../__tests__/stubs/user.stub';
import { changePasswordDto } from '../dto/changePassword.dto';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: UserRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(getRepositoryToken(User));

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('filterUserObject', () => {
    describe('when filterUserObject is called', () => {
      let filteredUser: GetUserResponse;

      beforeEach(() => {
        filteredUser = service.filterUserObject(userStub);
      });

      it('should return an filtered user object', () => {
        expect(filteredUser).toEqual({
          id: userStub.id,
          email: userStub.email,
        });
      });
    });
  });

  describe('returnAllUsers', () => {
    describe('when returnAllUsers is called', () => {
      let foundedUsers: GetUserResponse[];

      beforeEach(async () => {
        jest.spyOn(service, 'filterUserObject');
        foundedUsers = await service.returnAllUsers();
      });

      it('it should call the User repository', () => {
        expect(repository.find).toBeCalledWith();
      });

      it('should filter response from db', () => {
        expect(service.filterUserObject).toBeCalled();
      });

      it('should return an array of formatted users', () => {
        expect(foundedUsers).toEqual([
          { id: userStub.id, email: userStub.email },
        ]);
      });
    });
  });

  describe('registerUser', () => {
    describe('when registerUser is called', () => {
      let savedUser: GetUserResponse;
      let registerUserDto: registerDto;
      let hashedPassword: string;

      beforeEach(async () => {
        registerUserDto = {
          email: secondUserStub.email,
          password: secondUserStub.password,
        };
        jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);
        jest
          .spyOn(hashingUtil, 'hashPassword')
          .mockResolvedValueOnce('abcd123');
        jest.spyOn(service, 'filterUserObject');
        hashedPassword = 'abcd123';
        savedUser = await service.registerUser(registerUserDto);
      });

      it('should check if user exists', () => {
        expect(repository.findOne).toBeCalledWith({
          email: registerUserDto.email,
        });
      });

      it('should hash the password', () => {
        expect(hashingUtil.hashPassword).toBeCalledWith(
          registerUserDto.password,
        );
      });

      it('should save new user', () => {
        expect(repository.save).toBeCalledWith({
          email: registerUserDto.email,
          password: hashedPassword,
        });
      });

      it('should filter response from db', () => {
        expect(service.filterUserObject).toBeCalled();
      });

      it('should return an array of formatted users', () => {
        expect(savedUser).toEqual({
          id: secondUserStub.id,
          email: secondUserStub.email,
        });
      });
    });
  });

  describe('changePassword', () => {
    describe('when changePassword is called', () => {
      let savedUser: GetUserResponse;
      let userToCall: User;
      let newPasswordData: changePasswordDto;
      let hashedNewPassword: string;

      beforeEach(async () => {
        (bcrypt.compare as jest.Mock) = jest.fn().mockReturnValue(true);
        userToCall = userStub;
        newPasswordData = {
          oldPassword: userStub.password,
          newPassword: 'newPassword',
        };

        jest
          .spyOn(hashingUtil, 'hashPassword')
          .mockResolvedValueOnce('abcd123');
        jest.spyOn(service, 'filterUserObject');
        hashedNewPassword = 'abcd123';
        savedUser = await service.changePassword(userToCall, newPasswordData);
      });

      it('should check if old password is correct', () => {
        expect(bcrypt.compare).toBeCalledTimes(1);
      });

      it('should hash the password', () => {
        expect(hashingUtil.hashPassword).toBeCalledWith(
          newPasswordData.newPassword,
        );
      });

      it('should change users password and save user', () => {
        expect(repository.save).toBeCalledWith({
          id: userStub.id,
          email: userStub.email,
          password: hashedNewPassword,
          currentToken: userStub.currentToken,
          refreshToken: userStub.refreshToken,
        });
      });

      it('should filter response from db', () => {
        expect(service.filterUserObject).toBeCalled();
      });

      it('should return an array of formatted users', () => {
        expect(savedUser).toEqual({
          id: userStub.id,
          email: userStub.email,
        });
      });
    });
  });
});
