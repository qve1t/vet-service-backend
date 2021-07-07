import { ownerStub } from '../stubs/owner.stub';

export const OwnerRepositoryMock = {
  create: jest.fn().mockReturnValue(ownerStub),
  findOne: jest.fn().mockResolvedValue(ownerStub),
  save: jest.fn().mockResolvedValue(ownerStub),
  delete: jest.fn().mockResolvedValue(ownerStub),
  findAndCount: jest
    .fn()
    .mockResolvedValue([
      [{ id: ownerStub.id, name: ownerStub.name, surname: ownerStub.surname }],
      1,
    ]),
};
