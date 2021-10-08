import {
  NoteListInterface,
  NoteListResponse,
  NoteRegisterResponse,
} from '../../interfaces/note';
import { Note } from '../../note/note.entity';
import { ownerStub } from './owner.stub';
import { petStub } from './pet.stub';

export const noteStub: Note = {
  id: 'testNoteId',
  text: 'testText',
  dateTime: new Date(),
  ownerNote: ownerStub,
  petNote: petStub,
  userId: 'asd123',
};

export const notesListStub: NoteListInterface[] = [
  {
    id: 'testNoteId',
    text: 'testText',
    dateTime: new Date(),
  },
];

export const getNotesListResponse: NoteListResponse = {
  results: notesListStub,
  count: 1,
};

export const noteSuccessResponse: NoteRegisterResponse = {
  id: 'testNoteId',
  status: 'ok',
};
