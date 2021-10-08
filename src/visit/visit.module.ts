import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from '../owner/owner.entity';
import { Pet } from '../pet/pet.entity';
import { VisitController } from './visit.controller';
import { Visit } from './visit.entity';
import { VisitService } from './visit.service';
import { MedicineModule } from '../medicine/medicine.module';

@Module({
  imports: [TypeOrmModule.forFeature([Visit, Pet, Owner]), MedicineModule],
  controllers: [VisitController],
  providers: [VisitService],
})
export class VisitModule {}
