export interface OwnerInterface {
  id: string;
  name: string;
  surname: string;
  phone: string | null;
  email: string | null;
}

export type GetUserResponse = OwnerInterface;

export type GetAllUsersResponse = {
  id: string;
  name: string;
  surname: string;
};
