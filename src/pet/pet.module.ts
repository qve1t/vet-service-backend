import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetController } from './pet.controller';
import { Pet } from './pet.entity';
import { PetService } from './pet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pet])],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
