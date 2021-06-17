import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetUserResponse } from 'src/interfaces/user';
import { Repository } from 'typeorm';
import { registerDto } from '../dto/register.dto';
import { User } from '../user.entity';
import { UserService } from '../user.service';
import * as hashingUtil from '../../utils/passwordHash';
import { UserRepositoryMock } from './mocks/user.repository.mock';
import { userStub, secondUserStub } from './stubs/user.stub';

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
        jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);
        jest.spyOn(hashingUtil, 'hashPassword').mockResolvedValue('abcd123');
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
          secondUserStub.password,
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
});
