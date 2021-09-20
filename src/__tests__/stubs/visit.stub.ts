import {
  VisitListReponse,
  VisitRegisterResponse,
} from '../../interfaces/visit';
import { Visit } from '../../visit/visit.entity';
import { ownerStub } from './owner.stub';
import { petStub } from './pet.stub';

export const visitStub: Visit = {
  id: 'testVisitId',
  dateTime: new Date(),
  name: 'test visit',
  note: null,
  description: null,
  healing: null,
  interview: null,
  ownerOnVisit: ownerStub,
  petOnVisit: petStub,
  userId: 'test',
};

export const visitListResponse: VisitListReponse = [
  { id: visitStub.id, name: visitStub.name, dateTime: visitStub.dateTime },
];

export const visitSuccessResponse: VisitRegisterResponse = {
  id: visitStub.id,
  status: 'ok',
};
