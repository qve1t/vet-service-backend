import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Medicine } from '../medicine.entity';
import { MedicineService } from '../medicine.service';
import { MedicineOnVisit } from '../medicineOnVisit.entity';
import { MedicineMock } from './mocks/medicine.repositort.mock';
import { MedicineOnVisitMock } from './mocks/medicineOnVisit.repository.mock';

describe('MedicineService', () => {
  let service: MedicineService;
  let medicineRepository: Medicine;
  let medicineOnVisitRepository: MedicineOnVisit;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicineService,
        {
          provide: getRepositoryToken(Medicine),
          useValue: MedicineMock,
        },
        {
          provide: getRepositoryToken(MedicineOnVisit),
          useValue: MedicineOnVisitMock,
        },
      ],
    }).compile();

    service = module.get<MedicineService>(MedicineService);
    medicineRepository = module.get<Medicine>(getRepositoryToken(Medicine));
    medicineOnVisitRepository = module.get<MedicineOnVisit>(
      getRepositoryToken(MedicineOnVisit),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
