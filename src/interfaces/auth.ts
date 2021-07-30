export interface LoginUserInterface {
  email: string;
  password: string;
}

export interface IsUserLoggedResponse {
  isLogged: boolean;
  email: string;
}
