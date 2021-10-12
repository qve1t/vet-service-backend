export interface MedicineInterface {
  name: string;
  count: number;
  magazineCount: number;
  description: string | null;
}

export type RegisterMedicineInterface = MedicineInterface;

export interface MedicineUpdateInterface {
  id: string;
  name: string | null;
  count: number | null;
  magazineCount: number | null;
  description: string | null;
}

export interface MedicineListInterface extends MedicineInterface {
  id: string;
}

export interface MedicineQueryInterface {
  page: number;
  limit: number;
  searchText: string;
}

export type GetMedicineResponse = MedicineInterface;

export interface MedicineRegisterResponse {
  id: string;
  status: string;
}

export type MedicineListResponse = {
  results: MedicineListInterface[];
  count: number;
};

export type MedicineUpdateResponse = MedicineRegisterResponse;

export type MedicineDeleteResponse = MedicineRegisterResponse;
