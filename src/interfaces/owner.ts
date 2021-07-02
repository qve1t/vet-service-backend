export interface OwnerInterface {
  name: string;
  surname: string;
  phone: string | null;
  email: string | null;
  address: string | null;
}

export interface OwnerQueryInterface {
  page: number;
  limit: number;
  nameSurname: string;
}

export interface OwnerListInterface {
  id: string;
  name: string;
  surname: string;
}

export type GetOwnerResponse = OwnerInterface;

export type GetAllOwnersResponse = {
  id: string;
  name: string;
  surname: string;
};

export interface OwnerRegisterResponse {
  id: string;
  status: string;
}

export type OwnerListResponse = {
  results: OwnerListInterface[];
  count: number;
};

export type OwnerDeleteResponse = OwnerRegisterResponse;

export type AssignPetToOwnerResponse = OwnerRegisterResponse;
