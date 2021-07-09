export interface VisitInterface {
  dateTime: Date;
  name: string;
  note: string | null;
  interview: string | null;
  description: string | null;
  healing: string | null;
}

export interface VisitRegisterInterface extends VisitInterface {
  ownerId: string;
  petId: string;
}

export interface VisitUPdateInterface extends VisitInterface {
  id: string;
}

export interface VisitGetQuery {
  startDate: Date;
  endDate: Date;
}

export interface VisitListInterface {
  id: string;
  dateTime: Date;
  name: string;
}

export interface VisitRegisterResponse {
  id: string;
  status: string;
}

export type VisitUpdateResponse = VisitRegisterResponse;

export type VisitDeleteResponse = VisitRegisterResponse;

export type VisitListReponse = VisitListInterface[];
