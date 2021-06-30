import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AssignOwnerToPetResponse,
  PetDeleteResponse,
  PetRegisterResponse,
} from 'src/interfaces/pet';
import { Owner } from 'src/owner/owner.entity';
import { Repository } from 'typeorm';
import { assignOwnerToPetDto } from './dto/assignOwnerToPet';
import { registerPetDto } from './dto/registerPet.dto';
import { Pet } from './pet.entity';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet) private petRepository: Repository<Pet>,
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
  ) {}

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

  async assignOwnerToPet(
    assignOwnerToPetData: assignOwnerToPetDto,
  ): Promise<AssignOwnerToPetResponse> {
    const { petId, ownerId } = assignOwnerToPetData;

    const pet = await this.petRepository.findOne(petId);
    if (!pet) {
      throw new HttpException('Pet not found', HttpStatus.NOT_FOUND);
    }

    const owner = await this.ownerRepository.findOne(ownerId);
    if (!owner) {
      throw new HttpException('Owner not found', HttpStatus.NOT_FOUND);
    }

    pet.owner = owner;
    await this.petRepository.save(pet);

    return {
      id: petId,
      status: 'ok',
    };
  }
}
