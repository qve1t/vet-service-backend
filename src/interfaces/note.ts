export interface NoteInterface {
  id: string;
  text: string;
  dateTime: Date;
}

export interface NoteRegisterInterface {
  text: string;
  dateTime: Date;
  ownerId: string | null;
  petId: string | null;
}

export interface NoteUpdateInterface {
  id: string;
  text: string | null;
  ownerId: string | null;
  petId: string | null;
}

export interface NoteQueryInterface {
  page: number;
  limit: number;
  text: string;
}

export interface NoteDayQuery {
  startDate: Date;
  endDate: Date;
}

export interface NoteListInterface {
  id: string;
  text: string;
  dateTime: Date;
}

export interface NoteListResponse {
  results: NoteListInterface[];
  count: number;
}

export interface NoteRegisterResponse {
  id: string;
  status: string;
}

export type NoteUpdateResponse = NoteRegisterResponse;

export type NoteDeleteResponse = NoteRegisterResponse;
