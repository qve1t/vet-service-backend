import { VisitRegisterResponse } from 'src/interfaces/visit';
import { Visit } from '../../visit.entity';
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
};

export const visitListResponse = [
  { id: visitStub.id, name: visitStub.name, dateTime: visitStub.dateTime },
];

export const visitSuccessResponse: VisitRegisterResponse = {
  id: visitStub.id,
  status: 'ok',
};
