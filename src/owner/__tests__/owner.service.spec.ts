import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  AssignPetToOwnerResponse,
  OwnerDeleteResponse,
  OwnerListResponse,
  OwnerQueryInterface,
  OwnerRegisterResponse,
  OwnerUpdateResponse,
} from '../../interfaces/owner';
import { PetSexes } from '../../interfaces/pet';
import { Repository } from 'typeorm';
import { Pet } from '../../pet/pet.entity';
import { assignPetToOwnerDto } from '../dto/assignPetToOwner.dto';
import { registerOwnerDto } from '../dto/registerOwner.dto';
import { updateOwnerInfoDto } from '../dto/updateOwnerInfo.dto';
import { Owner } from '../owner.entity';
import { OwnerService } from '../owner.service';
import { OwnerRepositoryMock } from './mocks/owner.repository.mock';
import { PetRepositoryMock } from './mocks/pet.repository.mock';
import {
  getOwnerListResponse,
  ownerStub,
  ownerSuccessResponse,
} from './stubs/owner.stub';

describe('OwnerService', () => {
  let service: OwnerService;
  let ownerRepository: Repository<Owner>;
  let petRepository: Repository<Pet>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OwnerService,
        { provide: getRepositoryToken(Owner), useValue: OwnerRepositoryMock },
        { provide: getRepositoryToken(Pet), useValue: PetRepositoryMock },
      ],
    }).compile();

    service = module.get<OwnerService>(OwnerService);
    ownerRepository = module.get(getRepositoryToken(Owner));
    petRepository = module.get(getRepositoryToken(Pet));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerNewOwner', () => {
    describe('when registerNewOwner is called', () => {
      let createdOwner: Owner;
      let registerOwnerData: registerOwnerDto;
      let response: OwnerRegisterResponse;

      beforeEach(async () => {
        registerOwnerData = {
          name: 'Test',
          surname: 'Owner',
          address: null,
          email: null,
          phone: null,
        };

        createdOwner = ownerStub;
        response = await service.registerNewOwner(registerOwnerData);
      });

      it('should create new owner basing on data', () => {
        expect(ownerRepository.create).toBeCalledWith(registerOwnerData);
      });

      it('should save created owner', () => {
        expect(ownerRepository.save).toBeCalledWith(createdOwner);
      });

      it('should return successfull register response', () => {
        expect(response).toEqual(ownerSuccessResponse);
      });
    });
  });

  describe('updatePetInfo', () => {
    describe('when updatePetInfo is called', () => {
      let foundOwner: Owner;
      let updateOwnerInfoData: updateOwnerInfoDto;
      let response: OwnerUpdateResponse;

      beforeEach(async () => {
        updateOwnerInfoData = {
          id: ownerStub.id,
          address: 'testAddress',
          email: null,
          phone: null,
        };

        foundOwner = ownerStub;
        response = await service.updateOwnerInfo(updateOwnerInfoData);
      });

      it('should check if owner to update exists', () => {
        expect(ownerRepository.findOne).toBeCalledWith(updateOwnerInfoData.id);
      });

      it('should save updated owner', () => {
        expect(ownerRepository.save).toBeCalledWith({
          ...foundOwner,
          ...updateOwnerInfoData,
        });
      });

      it('should return successfull register response', () => {
        expect(response).toEqual(ownerSuccessResponse);
      });
    });
  });

  describe('getOwnersList', () => {
    describe('when getOwnersList is called', () => {
      let query: OwnerQueryInterface;
      let resultsResponse: OwnerListResponse;

      beforeEach(async () => {
        query = { page: 0, limit: 10, nameSurname: '' };
        resultsResponse = await service.getOwnersList(query);
      });

      it('should call find owne in db', () => {
        expect(ownerRepository.findAndCount).toHaveBeenCalled();
      });

      it('should return list of pets and count them', () => {
        expect(resultsResponse).toEqual(getOwnerListResponse);
      });
    });
  });

  describe('deletePet', () => {
    describe('when deletePet is called', () => {
      let ownerId: string;
      let deleteResponse: OwnerDeleteResponse;

      beforeEach(async () => {
        ownerId = ownerStub.id;
        deleteResponse = await service.deleteOwner(ownerId);
      });

      it('should check if owner exist', () => {
        expect(ownerRepository.findOne).toBeCalledWith(ownerId);
      });

      it('should delete existing pet', () => {
        expect(ownerRepository.delete).toBeCalledWith(ownerId);
      });

      it('should return deletion response', () => {
        expect(deleteResponse).toEqual(ownerSuccessResponse);
      });
    });
  });

  describe('assignOwnerToPet', () => {
    describe('when assignOwnerToPet is called', () => {
      let assignPetToOwnerData: assignPetToOwnerDto;
      let assignResponse: AssignPetToOwnerResponse;
      let petToSave: Pet;

      beforeEach(async () => {
        assignPetToOwnerData = { petId: 'testPetId', ownerId: ownerStub.id };
        assignResponse = await service.assignPetToOwner(assignPetToOwnerData);
        petToSave = {
          id: 'testPetId',
          name: 'testPet',
          type: 'dog',
          sex: PetSexes.MALE,
          chipId: null,
          tatooId: null,
          race: null,
          age: null,
          weight: null,
          height: null,
          length: null,
          diseases: null,
          others: null,
          visits: null,
          owner: ownerStub,
        };
      });

      it('should check if pet exist', () => {
        expect(petRepository.findOne).toBeCalledWith(
          assignPetToOwnerData.petId,
        );
      });

      it('should check if owner exist', () => {
        expect(ownerRepository.findOne).toBeCalledWith(
          assignPetToOwnerData.ownerId,
        );
      });

      it('should save new pets owner', () => {
        expect(petRepository.save).toBeCalledWith(petToSave);
      });

      it('should return assign response', () => {
        expect(assignResponse).toEqual(ownerSuccessResponse);
      });
    });
  });
});
