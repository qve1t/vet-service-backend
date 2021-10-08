import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visit } from '../visit/visit.entity';
import { MedicineController } from './medicine.controller';
import { Medicine } from './medicine.entity';
import { MedicineService } from './medicine.service';
import { MedicineOnVisit } from './medicineOnVisit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medicine, Visit, MedicineOnVisit])],
  controllers: [MedicineController],
  providers: [MedicineService],
  exports: [MedicineService],
})
export class MedicineModule {}
