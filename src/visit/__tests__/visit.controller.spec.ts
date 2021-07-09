import { Test, TestingModule } from '@nestjs/testing';
import {
  VisitDeleteResponse,
  VisitGetQuery,
  VisitListReponse,
  VisitRegisterResponse,
  VisitUpdateResponse,
} from '../../interfaces/visit';
import { RegisterVisitDto } from '../dto/registerVisit.dto';
import { UpdateVisitDto } from '../dto/updateVisit.dto';
import { VisitController } from '../visit.controller';
import { Visit } from '../visit.entity';
import { VisitService } from '../visit.service';
import { VisitServiceMock } from './mocks/visit.service.mock';
import { ownerStub } from './stubs/owner.stub';
import { petStub } from './stubs/pet.stub';
import {
  visitListResponse,
  visitStub,
  visitSuccessResponse,
} from './stubs/visit.stub';

describe('VisitController', () => {
  let controller: VisitController;
  let service: VisitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitController],
      providers: [VisitService],
    })
      .overrideProvider(VisitService)
      .useValue(VisitServiceMock)
      .compile();

    controller = module.get<VisitController>(VisitController);
    service = module.get<VisitService>(VisitService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getVisitsList', () => {
    let query: VisitGetQuery;
    let visitsResponse: VisitListReponse;

    beforeEach(async () => {
      query = { endDate: new Date(), startDate: new Date() };
      visitsResponse = await service.getVisitsForDay(query);
    });

    it('should call VisitService', () => {
      expect(service.getVisitsForDay).toBeCalledWith(query);
    });

    it('should return list of visits', () => {
      expect(visitsResponse).toEqual(visitListResponse);
    });
  });

  describe('getVisitDetails', () => {
    let visitId: string;
    let visitDetails: Visit;

    beforeEach(async () => {
      visitId = visitStub.id;
      visitDetails = await service.getVisitDetails(visitId);
    });

    it('should call VisitService', () => {
      expect(service.getVisitDetails).toBeCalledWith(visitId);
    });

    it('should return visit details', () => {
      expect(visitDetails).toEqual(visitStub);
    });
  });

  describe('registerNewVisit', () => {
    let registerVisitData: RegisterVisitDto;
    let registerResponse: VisitRegisterResponse;

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
      registerResponse = await service.registerVisit(registerVisitData);
    });

    it('should call VisitService', () => {
      expect(service.registerVisit).toBeCalledWith(registerVisitData);
    });

    it('should return success register response', () => {
      expect(registerResponse).toEqual(visitSuccessResponse);
    });
  });

  describe('updateVisit', () => {
    let updateVisitData: UpdateVisitDto;
    let updateResponse: VisitUpdateResponse;

    beforeEach(async () => {
      updateVisitData = {
        id: visitStub.id,
        dateTime: new Date(),
        name: 'test visit',
        note: 'test note',
        description: 'test description',
        healing: null,
        interview: null,
      };
      updateResponse = await service.updateVisit(updateVisitData);
    });

    it('should call VisitService', () => {
      expect(service.updateVisit).toBeCalledWith(updateVisitData);
    });

    it('should return success update response', () => {
      expect(updateResponse).toEqual(visitSuccessResponse);
    });
  });

  describe('deleteVisit', () => {
    let visitId: string;
    let deleteResponse: VisitDeleteResponse;

    beforeEach(async () => {
      visitId = visitStub.id;
      deleteResponse = await service.deleteVisit(visitId);
    });

    it('should call VisitService', () => {
      expect(service.deleteVisit).toBeCalledWith(visitId);
    });

    it('should return success delete response', () => {
      expect(deleteResponse).toEqual(visitSuccessResponse);
    });
  });
});
