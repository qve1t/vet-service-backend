import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import {
  AssignOwnerToPetResponse,
  PetDeleteResponse,
  PetListResponse,
  PetQueryInterface,
  PetRegisterResponse,
  PetUpdateResponse,
} from '../interfaces/pet';
import { Owner } from '../owner/owner.entity';
import { assignOwnerToPetDto } from './dto/assignOwnerToPet.dto';
import { registerPetDto } from './dto/registerPet.dto';
import { updatePetInfoDto } from './dto/updatePetInfo.dto';
import { Pet } from './pet.entity';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet) private petRepository: Repository<Pet>,
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
  ) {}

  async registerNewPet(
    registerPetData: registerPetDto,
    userId: string,
  ): Promise<PetRegisterResponse> {
    const ownerId = registerPetData.ownerId;
    delete registerPetData.ownerId;

    const newPet = this.petRepository.create({
      ...registerPetData,
      userId: userId,
    });

    //adding owner
    if (ownerId) {
      const owner = await this.ownerRepository.findOne({
        id: ownerId,
        userId: userId,
      });

      owner ? (newPet.owner = owner) : (newPet.owner = null);
    }

    await this.petRepository.save(newPet);

    return {
      id: newPet.id,
      status: 'ok',
    };
  }

  async updatePetInfo(
    updatePetInfoData: updatePetInfoDto,
    userId: string,
  ): Promise<PetUpdateResponse> {
    const ownerId = updatePetInfoData.ownerId;
    delete updatePetInfoData.ownerId;

    let petToUpdate = await this.petRepository.findOne({
      id: updatePetInfoData.id,
      userId: userId,
    });

    if (!petToUpdate) {
      throw new HttpException('Pet not found', HttpStatus.NOT_FOUND);
    }

    petToUpdate = { ...petToUpdate, ...updatePetInfoData };

    if (ownerId) {
      const owner = await this.ownerRepository.findOne({
        id: ownerId,
        userId: userId,
      });

      owner ? (petToUpdate.owner = owner) : (petToUpdate.owner = null);
    }

    await this.petRepository.save(petToUpdate);

    return {
      id: petToUpdate.id,
      status: 'ok',
    };
  }

  async getPetDetails(petId: string, userId: string): Promise<Pet> {
    const petToGet = await this.petRepository
      .createQueryBuilder('pet')
      .leftJoinAndSelect('pet.owner', 'owner')
      .leftJoinAndSelect('pet.visits', 'visit')
      .leftJoinAndSelect('pet.notes', 'notes')
      .where({ id: petId, userId: userId })
      .select([
        'pet.name',
        'pet.chipId',
        'pet.tatooId',
        'pet.type',
        'pet.race',
        'pet.age',
        'pet.sex',
        'pet.weight',
        'pet.height',
        'pet.length',
        'pet.diseases',
        'pet.others',
        'owner.id',
        'owner.name',
        'owner.surname',
        'visit.id',
        'visit.dateTime',
        'visit.name',
        'notes.id',
        'notes.text',
        'notes.dateTime',
      ])
      .getOne();

    if (!petToGet) {
      throw new HttpException('Pet not found', HttpStatus.NOT_FOUND);
    }

    return petToGet;
  }

  async getPetsList(
    query: PetQueryInterface,
    userId: string,
  ): Promise<PetListResponse> {
    const page = query.page || 0;
    const limit = query.limit || 10;
    const name = query.name || '';

    const [petList, count] = await this.petRepository
      .createQueryBuilder('pet')
      .leftJoinAndSelect('pet.owner', 'owner')
      .select([
        'pet.id',
        'pet.name',
        'pet.type',
        'owner.id',
        'owner.name',
        'owner.surname',
      ])
      .skip(page * limit)
      .take(limit)
      .where({ name: Like(`%${name}%`), userId: userId })
      .getManyAndCount();

    return {
      results: petList,
      count: count,
    };
  }

  async deletePet(petId: string, userId: string): Promise<PetDeleteResponse> {
    const petToDelete = await this.petRepository.findOne({
      id: petId,
      userId: userId,
    });
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
    userId: string,
  ): Promise<AssignOwnerToPetResponse> {
    const { petId, ownerId } = assignOwnerToPetData;

    const pet = await this.petRepository.findOne({ id: petId, userId: userId });
    if (!pet) {
      throw new HttpException('Pet not found', HttpStatus.NOT_FOUND);
    }

    const owner = await this.ownerRepository.findOne({
      id: ownerId,
      userId: userId,
    });
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
