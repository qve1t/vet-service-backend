export interface OwnerInterface {
  name: string;
  surname: string;
  phone: string | null;
  email: string | null;
  address: string | null;
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

export type OwnerDeleteResponse = OwnerRegisterResponse;
