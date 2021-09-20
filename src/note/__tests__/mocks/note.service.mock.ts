import {
  getNotesListResponse,
  noteSuccessResponse,
} from '../../../__tests__/stubs/note.stub';

export const NoteServiceMock = {
  getNotesList: jest.fn().mockResolvedValue(getNotesListResponse),
  getNotesForDay: jest.fn().mockResolvedValue(getNotesListResponse),
  registerNewNote: jest.fn().mockResolvedValue(noteSuccessResponse),
  updateNote: jest.fn().mockResolvedValue(noteSuccessResponse),
  deleteNote: jest.fn().mockResolvedValue(noteSuccessResponse),
};
