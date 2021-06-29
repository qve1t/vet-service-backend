import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PetDeleteResponse, PetRegisterResponse } from 'src/interfaces/pet';
import { Repository } from 'typeorm';
import { registerPetDto } from './dto/registerPet.dto';
import { Pet } from './pet.entity';

@Injectable()
export class PetService {
  constructor(@InjectRepository(Pet) private petRepository: Repository<Pet>) {}

  async registerNewPet(
    registerPetData: registerPetDto,
  ): Promise<PetRegisterResponse> {
    const newPet = this.petRepository.create({ ...registerPetData });
    await this.petRepository.save(newPet);

    return {
      id: newPet.id,
      status: 'ok',
    };
  }

  async deletePet(petId: string): Promise<PetDeleteResponse> {
    const petToDelete = await this.petRepository.findOne(petId);
    if (!petToDelete) {
      throw new HttpException('Pet not found', HttpStatus.NOT_FOUND);
    }

    await this.petRepository.delete(petId);

    return {
      id: petId,
      status: 'ok',
    };
  }
}
