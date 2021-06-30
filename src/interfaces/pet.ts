export enum PetSexes {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  MALE_CASTRATED = 'MALE_CASTRATED',
  FEMALE_CASTRATED = 'FEMALE_CASTRATED',
}

export interface PetInterface {
  name: string;
  chipId: string | null;
  tatooId: string | null;
  type: string;
  race: string | null;
  age: number | null;
  sex: PetSexes;
  weight: number | null;
  height: number | null;
  length: number | null;
  diseases: string | null;
  others: string | null;
}

export interface PetRegisterResponse {
  id: string;
  status: string;
}

export type PetDeleteResponse = PetRegisterResponse;

export type AssignOwnerToPetResponse = PetRegisterResponse;
