import {
  visitListResponse,
  visitStub,
  visitSuccessResponse,
} from '../../../__tests__/stubs/visit.stub';

export const VisitServiceMock = {
  getVisitsForDay: jest.fn().mockResolvedValue(visitListResponse),
  getVisitDetails: jest.fn().mockResolvedValue(visitStub),
  registerVisit: jest.fn().mockResolvedValue(visitSuccessResponse),
  updateVisit: jest.fn().mockResolvedValue(visitSuccessResponse),
  deleteVisit: jest.fn().mockResolvedValue(visitSuccessResponse),
};
