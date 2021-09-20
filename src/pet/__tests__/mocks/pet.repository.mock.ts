import { petStub } from '../../../__tests__/stubs/pet.stub';

export const PetRepositoryMock = {
  create: jest.fn().mockReturnValue(petStub),
  findOne: jest.fn().mockResolvedValue(petStub),
  save: jest.fn().mockResolvedValue(petStub),
  delete: jest.fn().mockResolvedValue(petStub),
  createQueryBuilder: jest.fn(() => ({
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn().mockResolvedValue([
      [
        {
          id: petStub.id,
          name: petStub.name,
          type: petStub.type,
          owner: petStub.owner,
        },
      ],
      1,
    ]),
  })),
};
