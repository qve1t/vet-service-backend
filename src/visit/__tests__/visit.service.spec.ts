import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  VisitDeleteResponse,
  VisitGetQuery,
  VisitListReponse,
  VisitRegisterResponse,
  VisitUpdateResponse,
} from 'src/interfaces/visit';
import { Between, Repository } from 'typeorm';
import { Owner } from '../../owner/owner.entity';
import { Pet } from '../../pet/pet.entity';
import { RegisterVisitDto } from '../dto/registerVisit.dto';
import { UpdateVisitDto } from '../dto/updateVisit.dto';
import { Visit } from '../visit.entity';
import { VisitService } from '../visit.service';
import { OwnerRepositoryMock } from './mocks/owner.repository.mock';
import { PetRepositoryMock } from './mocks/pet.repository.mock';
import { VisitRepositoryMock } from './mocks/visit.repository.mock';
import { ownerStub } from './stubs/owner.stub';
import { petStub } from './stubs/pet.stub';
import {
  visitListResponse,
  visitStub,
  visitSuccessResponse,
} from './stubs/visit.stub';

describe('VisitService', () => {
  let service: VisitService;
  let visitRepository: Repository<Visit>;
  let ownerRepository: Repository<Owner>;
  let petRepository: Repository<Pet>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VisitService,
        { provide: getRepositoryToken(Visit), useValue: VisitRepositoryMock },
        { provide: getRepositoryToken(Pet), useValue: PetRepositoryMock },
        { provide: getRepositoryToken(Owner), useValue: OwnerRepositoryMock },
      ],
    }).compile();

    service = module.get<VisitService>(VisitService);
    visitRepository = module.get(getRepositoryToken(Visit));
    ownerRepository = module.get(getRepositoryToken(Owner));
    petRepository = module.get(getRepositoryToken(Pet));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerVisit', () => {
    describe('when registerVisit is called', () => {
      let registerVisitData: RegisterVisitDto;
      let createdVisit: Visit;
      let visitResponse: VisitRegisterResponse;

      beforeEach(async () => {
        registerVisitData = {
          dateTime: new Date(),
          name: 'test visit',
          note: null,
          description: null,
          healing: null,
          interview: null,
          ownerId: ownerStub.id,
          petId: petStub.id,
        };
        createdVisit = visitStub;

        jest.spyOn(visitRepository, 'findOne').mockResolvedValueOnce(undefined);

        visitResponse = await service.registerVisit(registerVisitData);
      });
      it('should check if there is no visit with the same date', () => {
        expect(visitRepository.findOne).toBeCalledWith({
          dateTime: registerVisitData.dateTime,
        });
      });

      it('should find pet to register on visit', () => {
        expect(petRepository.findOne).toBeCalledWith(petStub.id);
      });

      it('should find owner to register on visit', () => {
        expect(ownerRepository.findOne).toBeCalledWith(ownerStub.id);
      });

      it('should create new visit from input data', () => {
        expect(visitRepository.create).toBeCalledWith({
          ...registerVisitData,
          petOnVisit: petStub,
          ownerOnVisit: ownerStub,
        });
      });

      it('should save created visit', () => {
        expect(visitRepository.save).toBeCalledWith(createdVisit);
      });

      it('should return successfull register response', () => {
        expect(visitResponse).toEqual(visitSuccessResponse);
      });
    });
  });

  describe('updateVisit', () => {
    describe('when updateVisit is called', () => {
      let updateVisitData: UpdateVisitDto;
      let foundVisit: Visit;
      let updateResponse: VisitUpdateResponse;

      beforeEach(async () => {
        updateVisitData = {
          id: visitStub.id,
          dateTime: new Date(),
          name: 'test visit',
          note: 'this is note visit',
          description: 'this is test description',
          healing: null,
          interview: null,
        };

        foundVisit = visitStub;
        updateResponse = await service.updateVisit(updateVisitData);
      });

      it('should check if visit to update exists', () => {
        expect(visitRepository.findOne).toBeCalledWith(updateVisitData.id);
      });

      it('should save visit with updated data', () => {
        expect(visitRepository.save).toBeCalledWith({
          ...foundVisit,
          ...updateVisitData,
        });
      });

      it('should return success update response', () => {
        expect(updateResponse).toEqual(visitSuccessResponse);
      });
    });
  });

  describe('getVisitDetails', () => {
    describe('when getVisitDetailsis called', () => {
      let visitId: string;
      let foundVisit: Visit;

      beforeEach(async () => {
        visitId = visitStub.id;
        foundVisit = await service.getVisitDetails(visitId);
      });

      it('should look for a viist', () => {
        expect(visitRepository.findOne).toBeCalledWith(visitId);
      });

      it('should return visit with its relations', () => {
        expect(foundVisit).toEqual(visitStub);
      });
    });
  });

  describe('getVisitsForDay', () => {
    describe('when getVisitsForDay called', () => {
      let query: VisitGetQuery;
      let listOfVisits: VisitListReponse;

      beforeEach(async () => {
        query = {
          startDate: new Date(),
          endDate: new Date(),
        };
        listOfVisits = await service.getVisitsForDay(query);
      });

      it('should look for a viist between certain dates', () => {
        expect(visitRepository.find).toBeCalledWith({
          where: {
            dateTime: Between(query.startDate, query.endDate),
          },
          select: ['id', 'dateTime', 'name'],
        });
      });

      it('should return list of visits', () => {
        expect(listOfVisits).toEqual(visitListResponse);
      });
    });
  });

  describe('deleteVisit', () => {
    describe('when deleteVisit called', () => {
      let visitId: string;
      let deleteResponse: VisitDeleteResponse;

      beforeEach(async () => {
        visitId = visitStub.id;
        deleteResponse = await service.deleteVisit(visitId);
      });

      it('should check if visit exists', () => {
        expect(visitRepository.findOne).toBeCalledWith(visitId);
      });

      it('should delete existing visit', () => {
        expect(visitRepository.delete).toBeCalledWith(visitId);
      });

      it('should return success visit delete', () => {
        expect(deleteResponse).toEqual(visitSuccessResponse);
      });
    });
  });
});
