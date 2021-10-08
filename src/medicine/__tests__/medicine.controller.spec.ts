import { Test, TestingModule } from '@nestjs/testing';
import { MedicineController } from '../medicine.controller';
import { MedicineService } from '../medicine.service';
import { MedicineServiceMock } from './mocks/medicine.service.mock';

describe('MedicineController', () => {
  let controller: MedicineController;
  let service: MedicineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicineController],
      providers: [MedicineService],
    })
      .overrideProvider(MedicineService)
      .useValue(MedicineServiceMock)
      .compile();

    controller = module.get<MedicineController>(MedicineController);
    service = module.get<MedicineService>(MedicineService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
