import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { Owner } from './owner.entity';
import { Pet } from '../pet/pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Owner, Pet])],
  providers: [OwnerService],
  controllers: [OwnerController],
})
export class OwnerModule {}
