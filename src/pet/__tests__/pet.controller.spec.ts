import { Test, TestingModule } from '@nestjs/testing';
import {
  AssignOwnerToPetResponse,
  PetDeleteResponse,
  PetListResponse,
  PetQueryInterface,
  PetRegisterResponse,
  PetSexes,
} from '../../interfaces/pet';
import { assignOwnerToPetDto } from '../dto/assignOwnerToPet.dto';
import { registerPetDto } from '../dto/registerPet.dto';
import { updatePetInfoDto } from '../dto/updatePetInfo.dto';
import { PetController } from '../pet.controller';
import { Pet } from '../pet.entity';
import { PetService } from '../pet.service';
import { PetServiceMock } from './mocks/pet.service.mock';
import {
  getPetListResponse,
  petStub,
  petSuccessResponse,
} from './stubs/pet.stub';

describe('PetController', () => {
  let controller: PetController;
  let service: PetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetController],
      providers: [PetService],
    })
      .overrideProvider(PetService)
      .useValue(PetServiceMock)
      .compile();

    controller = module.get<PetController>(PetController);
    service = module.get<PetService>(PetService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPetsList', () => {
    let pets: PetListResponse;
    let query: PetQueryInterface;

    beforeEach(async () => {
      query = { limit: 10, page: 0, name: '' };
      pets = await controller.getPetsList(query);
    });

    it('should call PetService', () => {
      expect(service.getPetsList).toBeCalledWith(query);
    });

    it('should return simplified array of pets and count them', () => {
      expect(pets).toEqual(getPetListResponse);
    });
  });

  describe('getPetDetails', () => {
    let pet: Pet;
    let petId: string;

    beforeEach(async () => {
      petId = petStub.id;
      pet = await controller.getPetDetails(petId);
    });

    it('should call PetService', () => {
      expect(service.getPetDetails).toBeCalledWith(petId);
    });

    it('should return detailed pet object', () => {
      expect(pet).toEqual(petStub);
    });
  });

  describe('registerNewPet', () => {
    let registerResponse: PetRegisterResponse;
    let registerPetData: registerPetDto;

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
      registerResponse = await controller.registerNewPet(registerPetData);
    });

    it('should call PetService', () => {
      expect(service.registerNewPet).toBeCalledWith(registerPetData);
    });

    it('should return success register response', () => {
      expect(registerResponse).toEqual(petSuccessResponse);
    });
  });

  describe('updatePetInfo', () => {
    let updateResponse: PetRegisterResponse;
    let updatePetInfoData: updatePetInfoDto;

    beforeEach(async () => {
      updatePetInfoData = {
        id: petStub.id,
        chipId: null,
        tatooId: null,
        race: 'york',
        age: 5,
        weight: null,
        height: null,
        length: null,
        diseases: null,
        others: null,
      };
      updateResponse = await controller.updatePetInfo(updatePetInfoData);
    });

    it('should call PetService', () => {
      expect(service.updatePetInfo).toBeCalledWith(updatePetInfoData);
    });

    it('should return success update response', () => {
      expect(updateResponse).toEqual(petSuccessResponse);
    });
  });

  describe('getPetDetails', () => {
    let deleteResponse: PetDeleteResponse;
    let petId: string;

    beforeEach(async () => {
      petId = petStub.id;
      deleteResponse = await controller.deletePet(petId);
    });

    it('should call PetService', () => {
      expect(service.deletePet).toBeCalledWith(petId);
    });

    it('should return success delete response', () => {
      expect(deleteResponse).toEqual(petSuccessResponse);
    });
  });

  describe('assignOwnerToPet', () => {
    let assingResponse: AssignOwnerToPetResponse;
    let assignOwnerToPetData: assignOwnerToPetDto;

    beforeEach(async () => {
      assignOwnerToPetData = { petId: petStub.id, ownerId: 'testOwnerId' };
      assingResponse = await controller.assignOwnerToPet(assignOwnerToPetData);
    });

    it('should call PetService', () => {
      expect(service.assignOwnerToPet).toBeCalledWith(assignOwnerToPetData);
    });

    it('should return success assign response', () => {
      expect(assingResponse).toEqual(petSuccessResponse);
    });
  });
});
