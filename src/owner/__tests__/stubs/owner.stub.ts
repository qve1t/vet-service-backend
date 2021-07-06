import {
  OwnerListInterface,
  OwnerListResponse,
  OwnerRegisterResponse,
} from '../../../interfaces/owner';
import { Owner } from '../../../owner/owner.entity';

export const ownerStub: Owner = {
  id: 'testOwnerId',
  name: 'Test',
  surname: 'Owner',
  address: null,
  email: null,
  phone: null,
  pets: null,
  visits: null,
};

export const ownersListStub: OwnerListInterface[] = [
  {
    id: 'testOwnerId',
    name: 'Test',
    surname: 'Owner',
  },
];

export const ownerSuccessResponse: OwnerRegisterResponse = {
  id: 'testOwnerId',
  status: 'ok',
};

export const getOwnerListResponse: OwnerListResponse = {
  results: ownersListStub,
  count: 1,
};
