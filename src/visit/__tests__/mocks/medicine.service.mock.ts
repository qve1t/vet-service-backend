import {
  MedicineStub,
  MedicineSuccessResponse,
} from '../../../__tests__/stubs/medicine.stub';

export const MedicineServiceMock = {
  saveUpdatedMedicineOnVisit: jest
    .fn()
    .mockImplementation(() => Promise.resolve()),
  chengeMedicineMagazineCount: jest
    .fn()
    .mockResolvedValue(MedicineSuccessResponse),
  getMedicineDetails: jest.fn().mockResolvedValue(MedicineStub),
  addMedicineToVisit: jest.fn().mockImplementation(() => Promise.resolve()),
};
