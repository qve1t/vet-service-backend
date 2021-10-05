import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  VisitDeleteResponse,
  VisitGetQuery,
  VisitListReponse,
  VisitRegisterResponse,
  VisitUpdateResponse,
} from '../../interfaces/visit';
import { User } from '../../user/user.entity';
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
import { ownerStub } from '../../__tests__/stubs/owner.stub';
import { petStub } from '../../__tests__/stubs/pet.stub';
import {
  visitListResponse,
  visitStub,
  visitSuccessResponse,
} from '../../__tests__/stubs/visit.stub';
import { userStub } from '../../__tests__/stubs/user.stub';

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
      let user: User;

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
        user = userStub;

        jest.spyOn(visitRepository, 'findOne').mockResolvedValueOnce(undefined);

        visitResponse = await service.registerVisit(registerVisitData, user.id);
      });
      it('should check if there is no visit with the same date', () => {
        expect(visitRepository.findOne).toBeCalledWith({
          dateTime: registerVisitData.dateTime,
          userId: user.id,
        });
      });

      it('should find pet to register on visit', () => {
        expect(petRepository.findOne).toBeCalledWith({
          id: petStub.id,
          userId: user.id,
        });
      });

      it('should find owner to register on visit', () => {
        expect(ownerRepository.findOne).toBeCalledWith({
          id: ownerStub.id,
          userId: user.id,
        });
      });

      it('should create new visit from input data', () => {
        expect(visitRepository.create).toBeCalledWith({
          ...registerVisitData,
          petOnVisit: petStub,
          ownerOnVisit: ownerStub,
          userId: user.id,
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
      let user: User;

      beforeEach(async () => {
        updateVisitData = {
          id: visitStub.id,
          dateTime: new Date(),
          name: 'test visit',
          note: 'this is note visit',
          description: 'this is test description',
          healing: null,
          interview: null,
          medicines: null,
        };

        foundVisit = visitStub;
        user = userStub;
        updateResponse = await service.updateVisit(updateVisitData, user.id);
      });

      it('should check if visit to update exists', () => {
        expect(visitRepository.findOne).toBeCalledWith({
          id: updateVisitData.id,
          userId: user.id,
        });
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
      let user: User;

      beforeEach(async () => {
        visitId = visitStub.id;
        user = userStub;
        foundVisit = await service.getVisitDetails(visitId, user.id);
      });

      it('should look for a viist', () => {
        expect(visitRepository.findOne).toBeCalledWith({
          id: visitId,
          userId: user.id,
        });
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
      let user: User;

      beforeEach(async () => {
        query = {
          startDate: new Date(),
          endDate: new Date(),
        };
        user = userStub;
        listOfVisits = await service.getVisitsForDay(query, user.id);
      });

      it('should look for a viist between certain dates', () => {
        expect(visitRepository.find).toBeCalledWith({
          where: {
            dateTime: Between(query.startDate, query.endDate),
            userId: user.id,
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
      let user: User;

      beforeEach(async () => {
        visitId = visitStub.id;
        user = userStub;
        deleteResponse = await service.deleteVisit(visitId, user.id);
      });

      it('should check if visit exists', () => {
        expect(visitRepository.findOne).toBeCalledWith({
          id: visitId,
          userId: user.id,
        });
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
