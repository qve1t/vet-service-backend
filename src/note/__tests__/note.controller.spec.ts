import { Test, TestingModule } from '@nestjs/testing';
import {
  NoteDayQuery,
  NoteDeleteResponse,
  NoteListResponse,
  NoteQueryInterface,
  NoteRegisterResponse,
  NoteUpdateResponse,
} from '../../interfaces/note';
import { User } from '../../user/user.entity';
import { RegisterNoteDto } from '../dto/RegisterNote.dto';
import { UpdateNoteDto } from '../dto/UpdateNote.dto';
import { NoteController } from '../note.controller';
import { NoteService } from '../note.service';
import { NoteServiceMock } from './mocks/note.service.mock';
import {
  getNotesListResponse,
  noteStub,
  noteSuccessResponse,
} from './stubs/note.stub';
import { userStub } from './stubs/user.stub';

describe('NoteController', () => {
  let controller: NoteController;
  let service: NoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [NoteService],
    })
      .overrideProvider(NoteService)
      .useValue(NoteServiceMock)
      .compile();

    controller = module.get<NoteController>(NoteController);
    service = module.get<NoteService>(NoteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getNotesList', () => {
    let notes: NoteListResponse;
    let query: NoteQueryInterface;
    let user: User;

    beforeEach(async () => {
      query = { limit: 10, page: 0, text: '' };
      user = userStub;
      notes = await controller.getNotesList(query, user);
    });

    it('should call NoteService', () => {
      expect(service.getNotesList).toBeCalledWith(query, user.id);
    });

    it('should return array of notes and count them', () => {
      expect(notes).toEqual(getNotesListResponse);
    });
  });

  describe('getNotesForDay', () => {
    let notes: NoteListResponse;
    let query: NoteDayQuery;
    let user: User;

    beforeEach(async () => {
      query = { endDate: new Date(), startDate: new Date() };
      user = userStub;
      notes = await controller.getNotesForDay(query, user);
    });

    it('should call NoteService', () => {
      expect(service.getNotesForDay).toBeCalledWith(query, user.id);
    });

    it('should return array of notes and count them', () => {
      expect(notes).toEqual(getNotesListResponse);
    });
  });

  describe('registerNewNote', () => {
    let registerResponse: NoteRegisterResponse;
    let registerNoteData: RegisterNoteDto;
    let user: User;

    beforeEach(async () => {
      registerNoteData = {
        text: 'testText',
        dateTime: new Date(),
        ownerId: null,
        petId: null,
      };
      user = userStub;
      registerResponse = await controller.registerNewNote(
        registerNoteData,
        user,
      );
    });

    it('should call NoteService', () => {
      expect(service.registerNewNote).toBeCalledWith(registerNoteData, user.id);
    });

    it('should return return success register response', () => {
      expect(registerResponse).toEqual(noteSuccessResponse);
    });
  });

  describe('updateNote', () => {
    let updateResponse: NoteUpdateResponse;
    let updateNoteData: UpdateNoteDto;
    let user: User;

    beforeEach(async () => {
      updateNoteData = {
        id: noteStub.id,
        text: 'testTextupdated',
        ownerId: null,
        petId: null,
      };
      user = userStub;
      updateResponse = await controller.updateNote(updateNoteData, user);
    });

    it('should call NoteService', () => {
      expect(service.updateNote).toBeCalledWith(updateNoteData, user.id);
    });

    it('should return return success update response', () => {
      expect(updateResponse).toEqual(noteSuccessResponse);
    });
  });

  describe('deleteNote', () => {
    let deleteResponse: NoteDeleteResponse;
    let noteId: string;
    let user: User;

    beforeEach(async () => {
      noteId = noteStub.id;
      user = userStub;
      deleteResponse = await controller.deleteNote(noteId, user);
    });

    it('should call NoteService', () => {
      expect(service.deleteNote).toBeCalledWith(noteId, user.id);
    });

    it('should return return success update response', () => {
      expect(deleteResponse).toEqual(noteSuccessResponse);
    });
  });
});
