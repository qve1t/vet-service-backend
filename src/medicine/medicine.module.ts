import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visit } from '../visit/visit.entity';
import { MedicineController } from './medicine.controller';
import { Medicine } from './medicine.entity';
import { MedicineService } from './medicine.service';

@Module({
  imports: [TypeOrmModule.forFeature([Medicine, Visit])],
  controllers: [MedicineController],
  providers: [MedicineService],
})
export class MedicineModule {}
