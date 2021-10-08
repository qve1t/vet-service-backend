import { MedicineRegisterResponse } from 'src/interfaces/medicine';
import { Medicine } from 'src/medicine/medicine.entity';
import { userStub } from './user.stub';

export const MedicineStub: Medicine = {
  id: 'testMedicineId',
  name: 'testMedicine',
  count: 10,
  magazineCount: 10,
  description: '',
  visits: [],
  userId: userStub.id,
};

export const MedicineSuccessResponse: MedicineRegisterResponse = {
  id: MedicineStub.id,
  status: 'ok',
};
