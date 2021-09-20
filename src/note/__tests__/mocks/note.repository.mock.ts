import { noteStub, notesListStub } from '../../../__tests__/stubs/note.stub';

export const NoteRepositoryMock = {
  findOne: jest.fn().mockResolvedValue(noteStub),
  create: jest.fn().mockReturnValue(noteStub),
  save: jest.fn().mockResolvedValue(noteStub),
  find: jest.fn().mockResolvedValue(noteStub),
  delete: jest.fn().mockResolvedValue(noteStub),
  createQueryBuilder: jest.fn(() => ({
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn().mockResolvedValue([notesListStub, 1]),
  })),
};
