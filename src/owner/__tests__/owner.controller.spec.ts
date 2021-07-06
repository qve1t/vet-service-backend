import { Test, TestingModule } from '@nestjs/testing';
import {
  AssignPetToOwnerResponse,
  OwnerDeleteResponse,
  OwnerListResponse,
  OwnerQueryInterface,
  OwnerRegisterResponse,
  OwnerUpdateResponse,
} from '../../interfaces/owner';
import { assignPetToOwnerDto } from '../dto/assignPetToOwnerDto';
import { registerOwnerDto } from '../dto/registerOwnerDto';
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

    beforeEach(async () => {
      query = { limit: 10, page: 0, nameSurname: '' };
      owners = await service.getOwnersList(query);
    });

    it('should call PetService', () => {
      expect(service.getOwnersList).toBeCalledWith(query);
    });

    it('should return simplified array of owners and count them', () => {
      expect(owners).toEqual(getOwnerListResponse);
    });
  });

  describe('getOwnerDetails', () => {
    let owner: Owner;
    let ownerId: string;

    beforeEach(async () => {
      ownerId = ownerStub.id;
      owner = await service.getOwnerDetails(ownerId);
    });

    it('should call PetService', () => {
      expect(service.getOwnerDetails).toBeCalledWith(ownerId);
    });

    it('should return detailed info about owner', () => {
      expect(owner).toEqual(ownerStub);
    });
  });

  describe('registerNewOwner', () => {
    let registerResponse: OwnerRegisterResponse;
    let registerOwnerData: registerOwnerDto;

    beforeEach(async () => {
      registerOwnerData = {
        name: 'NewTest',
        surname: 'NewOwner',
        address: null,
        email: null,
        phone: null,
      };
      registerResponse = await service.registerNewOwner(registerOwnerData);
    });

    it('should call PetService', () => {
      expect(service.registerNewOwner).toBeCalledWith(registerOwnerData);
    });

    it('should return success register response', () => {
      expect(registerResponse).toEqual(ownerSuccessResponse);
    });
  });

  describe('updateOwnerInfo', () => {
    let updateResponse: OwnerUpdateResponse;
    let updateOwnerInfoData: updateOwnerInfoDto;

    beforeEach(async () => {
      updateOwnerInfoData = {
        id: ownerStub.id,
        address: null,
        email: 'testemail@test.com',
        phone: null,
      };
      updateResponse = await service.updateOwnerInfo(updateOwnerInfoData);
    });

    it('should call PetService', () => {
      expect(service.updateOwnerInfo).toBeCalledWith(updateOwnerInfoData);
    });

    it('should return success update response', () => {
      expect(updateResponse).toEqual(ownerSuccessResponse);
    });
  });

  describe('deleteOwner', () => {
    let deleteResponse: OwnerDeleteResponse;
    let ownerId: string;

    beforeEach(async () => {
      ownerId = ownerStub.id;
      deleteResponse = await service.deleteOwner(ownerId);
    });

    it('should call PetService', () => {
      expect(service.deleteOwner).toBeCalledWith(ownerId);
    });

    it('should return success delete response', () => {
      expect(deleteResponse).toEqual(ownerSuccessResponse);
    });
  });

  describe('assingPetToOwner', () => {
    let assignPetResponse: AssignPetToOwnerResponse;
    let assignPetToOwnerData: assignPetToOwnerDto;

    beforeEach(async () => {
      assignPetToOwnerData = { ownerId: ownerStub.id, petId: 'testPetId' };
      assignPetResponse = await service.assignPetToOwner(assignPetToOwnerData);
    });

    it('should call PetService', () => {
      expect(service.assignPetToOwner).toBeCalledWith(assignPetToOwnerData);
    });

    it('should return success assign response', () => {
      expect(assignPetResponse).toEqual(ownerSuccessResponse);
    });
  });
});
