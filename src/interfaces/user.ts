export interface UserInterface {
  id: string;
  email: string;
  password: string;
}

export type GetUserResponse = {
  id: string;
  email: string;
};
