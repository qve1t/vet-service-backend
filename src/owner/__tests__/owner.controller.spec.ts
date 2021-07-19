import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../user/user.entity';
import {
  AssignPetToOwnerResponse,
  OwnerDeleteResponse,
  OwnerListResponse,
  OwnerQueryInterface,
  OwnerRegisterResponse,
  OwnerUpdateResponse,
} from '../../interfaces/owner';
import { assignPetToOwnerDto } from '../dto/assignPetToOwner.dto';
import { registerOwnerDto } from '../dto/registerOwner.dto';
import { updateOwnerInfoDto } from '../dto/updateOwnerInfo.dto';
import { OwnerController } from '../owner.controller';
import { Owner } from '../owner.entity';
import { OwnerService } from '../owner.service';
import { OwnerServiceMock } from './mocks/owner.service.mock';
import {
  getOwnerListResponse,
  ownerStub,
  ownerSuccessResponse,
} from './stubs/owner.stub';
import { userStub } from './stubs/user.stub';

describe('OwnerController', () => {
  let controller: OwnerController;
  let service: OwnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwnerController],
      providers: [OwnerService],
    })
      .overrideProvider(OwnerService)
      .useValue(OwnerServiceMock)
      .compile();

    controller = module.get<OwnerController>(OwnerController);
    service = module.get<OwnerService>(OwnerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getOwnersList', () => {
    let owners: OwnerListResponse;
    let query: OwnerQueryInterface;
    let user: User;

    beforeEach(async () => {
      query = { limit: 10, page: 0, nameSurname: '' };
      user = userStub;
      owners = await controller.getOwnersList(query, user);
    });

    it('should call PetService', () => {
      expect(service.getOwnersList).toBeCalledWith(query, user.id);
    });

    it('should return simplified array of owners and count them', () => {
      expect(owners).toEqual(getOwnerListResponse);
    });
  });

  describe('getOwnerDetails', () => {
    let owner: Owner;
    let ownerId: string;
    let user: User;

    beforeEach(async () => {
      ownerId = ownerStub.id;
      user = userStub;
      owner = await controller.getOwnerDetails(ownerId, user);
    });

    it('should call PetService', () => {
      expect(service.getOwnerDetails).toBeCalledWith(ownerId, user.id);
    });

    it('should return detailed info about owner', () => {
      expect(owner).toEqual(ownerStub);
    });
  });

  describe('registerNewOwner', () => {
    let registerResponse: OwnerRegisterResponse;
    let registerOwnerData: registerOwnerDto;
    let user: User;

    beforeEach(async () => {
      registerOwnerData = {
        name: 'NewTest',
        surname: 'NewOwner',
        address: null,
        email: null,
        phone: null,
      };
      user = userStub;
      registerResponse = await controller.registerNewOwner(
        registerOwnerData,
        user,
      );
    });

    it('should call PetService', () => {
      expect(service.registerNewOwner).toBeCalledWith(
        registerOwnerData,
        user.id,
      );
    });

    it('should return success register response', () => {
      expect(registerResponse).toEqual(ownerSuccessResponse);
    });
  });

  describe('updateOwnerInfo', () => {
    let updateResponse: OwnerUpdateResponse;
    let updateOwnerInfoData: updateOwnerInfoDto;
    let user: User;

    beforeEach(async () => {
      updateOwnerInfoData = {
        id: ownerStub.id,
        address: null,
        email: 'testemail@test.com',
        phone: null,
      };
      user = userStub;
      updateResponse = await controller.updateOwnerInfo(
        updateOwnerInfoData,
        user,
      );
    });

    it('should call PetService', () => {
      expect(service.updateOwnerInfo).toBeCalledWith(
        updateOwnerInfoData,
        user.id,
      );
    });

    it('should return success update response', () => {
      expect(updateResponse).toEqual(ownerSuccessResponse);
    });
  });

  describe('deleteOwner', () => {
    let deleteResponse: OwnerDeleteResponse;
    let ownerId: string;
    let user: User;

    beforeEach(async () => {
      ownerId = ownerStub.id;
      user = userStub;
      deleteResponse = await controller.deleteOwner(ownerId, user);
    });

    it('should call PetService', () => {
      expect(service.deleteOwner).toBeCalledWith(ownerId, user.id);
    });

    it('should return success delete response', () => {
      expect(deleteResponse).toEqual(ownerSuccessResponse);
    });
  });

  describe('assingPetToOwner', () => {
    let assignPetResponse: AssignPetToOwnerResponse;
    let assignPetToOwnerData: assignPetToOwnerDto;
    let user: User;

    beforeEach(async () => {
      assignPetToOwnerData = { ownerId: ownerStub.id, petId: 'testPetId' };
      user = userStub;
      assignPetResponse = await controller.assingPetToOwner(
        assignPetToOwnerData,
        user,
      );
    });

    it('should call PetService', () => {
      expect(service.assignPetToOwner).toBeCalledWith(
        assignPetToOwnerData,
        user.id,
      );
    });

    it('should return success assign response', () => {
      expect(assignPetResponse).toEqual(ownerSuccessResponse);
    });
  });
});
