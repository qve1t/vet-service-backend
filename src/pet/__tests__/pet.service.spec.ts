import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  AssignOwnerToPetResponse,
  PetDeleteResponse,
  PetListResponse,
  PetQueryInterface,
  PetRegisterResponse,
  PetSexes,
  PetUpdateResponse,
} from '../../interfaces/pet';
import { Owner } from '../../owner/owner.entity';
import { assignOwnerToPetDto } from '../dto/assignOwnerToPet';
import { registerPetDto } from '../dto/registerPet.dto';
import { updatePetInfoDto } from '../dto/updatePetInfo.dto';
import { Pet } from '../pet.entity';
import { PetService } from '../pet.service';
import { OwnerRepositoryMock } from './mocks/owner.repository.mock';
import { PetRepositoryMock } from './mocks/pet.repository.mock';
import {
  getPetListResponse,
  petStub,
  petSuccessResponse,
} from './stubs/pet.stub';

describe('PetService', () => {
  let service: PetService;
  let petRepository: Repository<Pet>;
  let ownerRepository: Repository<Owner>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PetService,
        { provide: getRepositoryToken(Pet), useValue: PetRepositoryMock },
        { provide: getRepositoryToken(Owner), useValue: OwnerRepositoryMock },
      ],
    }).compile();

    service = module.get<PetService>(PetService);
    petRepository = module.get(getRepositoryToken(Pet));
    ownerRepository = module.get(getRepositoryToken(Owner));

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerNewPet', () => {
    describe('when registerNewPet is called', () => {
      let createdPet: Pet;
      let registerPetData: registerPetDto;
      let response: PetRegisterResponse;

      beforeEach(async () => {
        registerPetData = {
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
        };

        createdPet = petStub;
        response = await service.registerNewPet(registerPetData);
      });

      it('should create new pet basing on data', () => {
        expect(petRepository.create).toBeCalledWith(registerPetData);
      });

      it('should save created pet', () => {
        expect(petRepository.save).toBeCalledWith(createdPet);
      });

      it('should return successfull register response', () => {
        expect(response).toEqual(petSuccessResponse);
      });
    });
  });

  describe('updatePetInfo', () => {
    describe('when updatePetInfo is called', () => {
      let foundPet: Pet;
      let updatePetInfoData: updatePetInfoDto;
      let response: PetUpdateResponse;

      beforeEach(async () => {
        updatePetInfoData = {
          id: petStub.id,
          chipId: null,
          tatooId: null,
          race: null,
          age: 18,
          weight: 20,
          height: null,
          length: null,
          diseases: null,
          others: null,
        };

        foundPet = petStub;
        response = await service.updatePetInfo(updatePetInfoData);
      });

      it('should check if pet to update exists', () => {
        expect(petRepository.findOne).toBeCalledWith(updatePetInfoData.id);
      });

      it('should save updated pet', () => {
        expect(petRepository.save).toBeCalledWith({
          ...foundPet,
          ...updatePetInfoData,
        });
      });

      it('should return successfull register response', () => {
        expect(response).toEqual(petSuccessResponse);
      });
    });
  });

  describe('getPetsList', () => {
    describe('when getPetsList is called', () => {
      let query: PetQueryInterface;
      let resultsResponse: PetListResponse;

      beforeEach(async () => {
        query = { page: 0, limit: 10, name: '' };
        resultsResponse = await service.getPetsList(query);
      });

      it('should call the query builder', () => {
        expect(petRepository.createQueryBuilder).toHaveBeenCalled();
      });

      it('should return list of pets and count them', () => {
        expect(resultsResponse).toEqual(getPetListResponse);
      });
    });
  });

  describe('deletePet', () => {
    describe('when deletePet is called', () => {
      let petId: string;
      let deleteResponse: PetDeleteResponse;

      beforeEach(async () => {
        petId = petStub.id;
        deleteResponse = await service.deletePet(petId);
      });

      it('should check if pet exist', () => {
        expect(petRepository.findOne).toBeCalledWith(petId);
      });

      it('should delete existing pet', () => {
        expect(petRepository.delete).toBeCalledWith(petId);
      });

      it('should return deletion response', () => {
        expect(deleteResponse).toEqual(petSuccessResponse);
      });
    });
  });

  describe('assignOwnerToPet', () => {
    describe('when assignOwnerToPet is called', () => {
      let assignOwnerToPetData: assignOwnerToPetDto;
      let assignResponse: AssignOwnerToPetResponse;
      let petToSave: Pet;

      beforeEach(async () => {
        assignOwnerToPetData = { petId: petStub.id, ownerId: 'testOwnerId' };
        assignResponse = await service.assignOwnerToPet(assignOwnerToPetData);
        petToSave = petStub;
      });

      it('should check if pet exist', () => {
        expect(petRepository.findOne).toBeCalledWith(
          assignOwnerToPetData.petId,
        );
      });

      it('should check if owner exist', () => {
        expect(ownerRepository.findOne).toBeCalledWith(
          assignOwnerToPetData.ownerId,
        );
      });

      it('should save new pets owner', () => {
        expect(petRepository.save).toBeCalledWith(petToSave);
      });

      it('should return assign response', () => {
        expect(assignResponse).toEqual(petSuccessResponse);
      });
    });
  });
});
