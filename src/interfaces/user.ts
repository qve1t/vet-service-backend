export interface UserInterface {
  id: string;
  email: string;
  password: string;
  currentToken: string | null;
}

export type GetUserResponse = {
  id: string;
  email: string;
};
