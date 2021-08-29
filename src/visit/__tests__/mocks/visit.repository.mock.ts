import { visitListResponse, visitStub } from '../stubs/visit.stub';

export const VisitRepositoryMock = {
  findOne: jest.fn().mockResolvedValue(visitStub),
  create: jest.fn().mockReturnValue(visitStub),
  save: jest.fn().mockResolvedValue(visitStub),
  find: jest.fn().mockResolvedValue(visitListResponse),
  delete: jest.fn().mockResolvedValue(visitStub),
  createQueryBuilder: jest.fn(() => ({
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    getOne: jest.fn().mockResolvedValue({
      ...visitStub,
    }),
  })),
};
