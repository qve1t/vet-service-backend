import { Test, TestingModule } from '@nestjs/testing';
import { Owner } from '../../owner/owner.entity';
import { Pet } from '../../pet/pet.entity';
import { Repository } from 'typeorm';
import { Note } from '../note.entity';
import { NoteService } from '../note.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NoteRepositoryMock } from './mocks/note.repository.mock';
import { PetRepositoryMock } from './mocks/pet.repository.mock';
import { OwnerRepositoryMock } from './mocks/owner.repository.mock';
import {
  NoteDayQuery,
  NoteDeleteResponse,
  NoteListResponse,
  NoteQueryInterface,
  NoteRegisterResponse,
  NoteUpdateResponse,
} from '../../interfaces/note';
import { User } from '../../user/user.entity';
import { userStub } from '../../auth/__tests__/stub/user.stub';
import {
  getNotesListResponse,
  noteStub,
  noteSuccessResponse,
} from './stubs/note.stub';
import { RegisterNoteDto } from '../dto/RegisterNote.dto';
import { ownerStub } from './stubs/owner.stub';
import { petStub } from './stubs/pet.stub';
import { UpdateNoteDto } from '../dto/UpdateNote.dto';

describe('NoteService', () => {
  let service: NoteService;
  let noteRepository: Repository<Note>;
  let petRepository: Repository<Pet>;
  let ownerRepository: Repository<Owner>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteService,
        { provide: getRepositoryToken(Note), useValue: NoteRepositoryMock },
        { provide: getRepositoryToken(Pet), useValue: PetRepositoryMock },
        { provide: getRepositoryToken(Owner), useValue: OwnerRepositoryMock },
      ],
    }).compile();

    service = module.get<NoteService>(NoteService);
    noteRepository = module.get(getRepositoryToken(Note));
    petRepository = module.get(getRepositoryToken(Pet));
    ownerRepository = module.get(getRepositoryToken(Owner));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getNotesList', () => {
    describe('when getNotesList is called', () => {
      let query: NoteQueryInterface;
      let notes: NoteListResponse;
      let user: User;

      beforeEach(async () => {
        query = { limit: 10, page: 0, text: '' };
        user = userStub;
        notes = await service.getNotesList(query, user.id);
      });

      it('should call query builder', () => {
        expect(noteRepository.createQueryBuilder).toHaveBeenCalled();
      });

      it('should return array of notes and count them', () => {
        expect(notes).toEqual(getNotesListResponse);
      });
    });
  });

  describe('getNotesForDay', () => {
    describe('when getNotesForDay is called', () => {
      let query: NoteDayQuery;
      let notes: NoteListResponse;
      let user: User;

      beforeEach(async () => {
        query = { endDate: new Date(), startDate: new Date() };
        user = userStub;
        notes = await service.getNotesForDay(query, user.id);
      });

      it('should call query builder', () => {
        expect(noteRepository.createQueryBuilder).toHaveBeenCalled();
      });

      it('should return array of notes and count them', () => {
        expect(notes).toEqual(getNotesListResponse);
      });
    });
  });

  describe('registerNewNote', () => {
    describe('when registerNewNote is called', () => {
      let createdNote: Note;
      let registerNoteData: RegisterNoteDto;
      let response: NoteRegisterResponse;
      let user: User;

      beforeEach(async () => {
        registerNoteData = {
          text: 'testText',
          dateTime: new Date(),
          ownerId: ownerStub.id,
          petId: petStub.id,
        };
        createdNote = noteStub;
        user = userStub;
        response = await service.registerNewNote(registerNoteData, user.id);
      });

      it('should create new note basing on data', () => {
        expect(noteRepository.create).toBeCalledWith({
          text: registerNoteData.text,
          dateTime: registerNoteData.dateTime,
          petNote: null,
          ownerNote: null,
          userId: user.id,
        });
      });

      it('should check if owner exiss', () => {
        expect(ownerRepository.findOne).toBeCalledWith({
          id: registerNoteData.ownerId,
          userId: user.id,
        });
      });

      it('should check if pet exiss', () => {
        expect(petRepository.findOne).toBeCalledWith({
          id: registerNoteData.petId,
          userId: user.id,
        });
      });

      it('should save created note', () => {
        expect(noteRepository.save).toBeCalledWith(createdNote);
      });

      it('should return successfull register response', () => {
        expect(response).toEqual(noteSuccessResponse);
      });
    });
  });

  describe('updateNote', () => {
    describe('when updateNote is called', () => {
      let updatedNote: Note;
      let updateNoteData: UpdateNoteDto;
      let response: NoteUpdateResponse;
      let user: User;

      beforeEach(async () => {
        updateNoteData = {
          id: noteStub.id,
          text: 'testTextUpdate',
          ownerId: ownerStub.id,
          petId: petStub.id,
        };
        updatedNote = noteStub;
        user = userStub;
        response = await service.updateNote(updateNoteData, user.id);
      });

      it('should check if note to update exists', () => {
        expect(noteRepository.findOne).toBeCalledWith({
          id: updateNoteData.id,
          userId: user.id,
        });
      });

      it('should check if owner exiss', () => {
        expect(ownerRepository.findOne).toBeCalledWith({
          id: updateNoteData.ownerId,
          userId: user.id,
        });
      });

      it('should check if pet exiss', () => {
        expect(petRepository.findOne).toBeCalledWith({
          id: updateNoteData.petId,
          userId: user.id,
        });
      });

      it('should save updated note', () => {
        expect(noteRepository.save).toBeCalledWith({
          ...updatedNote,
          text: updateNoteData.text,
        });
      });

      it('should return successfull update response', () => {
        expect(response).toEqual(noteSuccessResponse);
      });
    });
  });

  describe('deleteNote', () => {
    describe('when deleteNote is called', () => {
      let noteId: string;
      let response: NoteDeleteResponse;
      let user: User;

      beforeEach(async () => {
        noteId = noteStub.id;
        user = userStub;
        response = await service.deleteNote(noteId, user.id);
      });

      it('should check if note to delete exists', () => {
        expect(noteRepository.findOne).toBeCalledWith({
          id: noteId,
          userId: user.id,
        });
      });

      it('should delete existing note', () => {
        expect(noteRepository.delete).toBeCalledWith(noteId);
      });

      it('should return successfull delete response', () => {
        expect(response).toEqual(noteSuccessResponse);
      });
    });
  });
});
