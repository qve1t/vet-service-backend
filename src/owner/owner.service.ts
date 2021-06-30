import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AssignPetToOwnerResponse,
  OwnerDeleteResponse,
  OwnerRegisterResponse,
} from 'src/interfaces/owner';
import { Pet } from 'src/pet/pet.entity';
import { Repository } from 'typeorm';
import { assignPetToOwnerDto } from './dto/assignPetToOwnerDto';
import { registerOwnerDto } from './dto/registerOwnerDto';
import { Owner } from './owner.entity';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
    @InjectRepository(Pet) private petRepository: Repository<Pet>,
  ) {}

  async registerNewOwner(
    registerOwnerData: registerOwnerDto,
  ): Promise<OwnerRegisterResponse> {
    const newOwner = this.ownerRepository.create({ ...registerOwnerData });
    await this.ownerRepository.save(newOwner);

    return {
      id: newOwner.id,
      status: 'ok',
    };
  }

  async deleteOwner(ownerId: string): Promise<OwnerDeleteResponse> {
    const ownerToDelete = await this.ownerRepository.findOne(ownerId);
    if (!ownerToDelete) {
      throw new HttpException('Owner not found', HttpStatus.NOT_FOUND);
    }

    await this.ownerRepository.delete(ownerId);

    return {
      id: ownerId,
      status: 'ok',
    };
  }

  async assignPetToOwner(
    assignPetToOwnerData: assignPetToOwnerDto,
  ): Promise<AssignPetToOwnerResponse> {
    const { ownerId, petId } = assignPetToOwnerData;

    const owner = await this.ownerRepository.findOne(ownerId);
    if (!owner) {
      throw new HttpException('Owner not found', HttpStatus.NOT_FOUND);
    }

    const pet = await this.petRepository.findOne(petId);
    if (!pet) {
      throw new HttpException('Pet not found', HttpStatus.NOT_FOUND);
    }

    pet.owner = owner;
    await this.petRepository.save(pet);

    return {
      id: ownerId,
      status: 'ok',
    };
  }
}
