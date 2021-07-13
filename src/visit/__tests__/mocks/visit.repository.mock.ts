import { visitListResponse, visitStub } from '../stubs/visit.stub';

export const VisitRepositoryMock = {
  findOne: jest.fn().mockResolvedValue(visitStub),
  create: jest.fn().mockReturnValue(visitStub),
  save: jest.fn().mockResolvedValue(visitStub),
  find: jest.fn().mockResolvedValue(visitListResponse),
  delete: jest.fn().mockResolvedValue(visitStub),
};
