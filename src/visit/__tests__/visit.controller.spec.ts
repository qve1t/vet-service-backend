import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../user/user.entity';
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
import { userStub } from './stubs/user.stub';
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
    let user: User;

    beforeEach(async () => {
      query = { endDate: new Date(), startDate: new Date() };
      user = userStub;
      visitsResponse = await controller.getVisitsList(query, user);
    });

    it('should call VisitService', () => {
      expect(service.getVisitsForDay).toBeCalledWith(query, user.id);
    });

    it('should return list of visits', () => {
      expect(visitsResponse).toEqual(visitListResponse);
    });
  });

  describe('getVisitDetails', () => {
    let visitId: string;
    let visitDetails: Visit;
    let user: User;

    beforeEach(async () => {
      visitId = visitStub.id;
      user = userStub;
      visitDetails = await controller.getVisitDetails(visitId, user);
    });

    it('should call VisitService', () => {
      expect(service.getVisitDetails).toBeCalledWith(visitId, user.id);
    });

    it('should return visit details', () => {
      expect(visitDetails).toEqual(visitStub);
    });
  });

  describe('registerNewVisit', () => {
    let registerVisitData: RegisterVisitDto;
    let registerResponse: VisitRegisterResponse;
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
      user = userStub;
      registerResponse = await controller.registerNewVisit(
        registerVisitData,
        user,
      );
    });

    it('should call VisitService', () => {
      expect(service.registerVisit).toBeCalledWith(registerVisitData, user.id);
    });

    it('should return success register response', () => {
      expect(registerResponse).toEqual(visitSuccessResponse);
    });
  });

  describe('updateVisit', () => {
    let updateVisitData: UpdateVisitDto;
    let updateResponse: VisitUpdateResponse;
    let user: User;

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
      user = userStub;
      updateResponse = await controller.updateVisit(updateVisitData, user);
    });

    it('should call VisitService', () => {
      expect(service.updateVisit).toBeCalledWith(updateVisitData, user.id);
    });

    it('should return success update response', () => {
      expect(updateResponse).toEqual(visitSuccessResponse);
    });
  });

  describe('deleteVisit', () => {
    let visitId: string;
    let deleteResponse: VisitDeleteResponse;
    let user: User;

    beforeEach(async () => {
      visitId = visitStub.id;
      user = userStub;
      deleteResponse = await controller.deleteVisit(visitId, user);
    });

    it('should call VisitService', () => {
      expect(service.deleteVisit).toBeCalledWith(visitId, user.id);
    });

    it('should return success delete response', () => {
      expect(deleteResponse).toEqual(visitSuccessResponse);
    });
  });
});
