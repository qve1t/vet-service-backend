import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import {
  AssignPetToOwnerResponse,
  OwnerDeleteResponse,
  OwnerListResponse,
  OwnerQueryInterface,
  OwnerRegisterResponse,
  OwnerUpdateResponse,
} from '../interfaces/owner';
import { Pet } from '../pet/pet.entity';
import { assignPetToOwnerDto } from './dto/assignPetToOwner.dto';
import { registerOwnerDto } from './dto/registerOwner.dto';
import { updateOwnerInfoDto } from './dto/updateOwnerInfo.dto';
import { Owner } from './owner.entity';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
    @InjectRepository(Pet) private petRepository: Repository<Pet>,
  ) {}

  async registerNewOwner(
    registerOwnerData: registerOwnerDto,
    userId: string,
  ): Promise<OwnerRegisterResponse> {
    const newOwner = this.ownerRepository.create({
      ...registerOwnerData,
      userId: userId,
    });
    await this.ownerRepository.save(newOwner);

    return {
      id: newOwner.id,
      status: 'ok',
    };
  }

  async updateOwnerInfo(
    updateOwnerInfoData: updateOwnerInfoDto,
    userId: string,
  ): Promise<OwnerUpdateResponse> {
    let ownerToUpdate = await this.ownerRepository.findOne({
      id: updateOwnerInfoData.id,
      userId,
    });

    if (!ownerToUpdate) {
      throw new HttpException('Owner not found', HttpStatus.NOT_FOUND);
    }

    ownerToUpdate = { ...ownerToUpdate, ...updateOwnerInfoData };

    await this.ownerRepository.save(ownerToUpdate);

    return {
      id: ownerToUpdate.id,
      status: 'ok',
    };
  }

  async getOwnerDetails(ownerId: string, userId: string): Promise<Owner> {
    const ownerToGet = await this.ownerRepository
      .createQueryBuilder('owner')
      .leftJoinAndSelect('owner.pets', 'pets')
      .where({ id: ownerId, userId: userId })
      .select([
        'owner.name',
        'owner.surname',
        'owner.phone',
        'owner.email',
        'owner.address',
        'pets.id',
        'pets.name',
        'pets.type',
      ])
      .getOne();

    if (!ownerToGet) {
      throw new HttpException('Owner not found', HttpStatus.NOT_FOUND);
    }

    return ownerToGet;
  }

  async getOwnersList(
    query: OwnerQueryInterface,
    userId: string,
  ): Promise<OwnerListResponse> {
    const page = query.page || 0;
    const limit = query.limit || 10;
    const nameSurname = query.nameSurname || '';

    const [ownersList, count] = await this.ownerRepository.findAndCount({
      where: [
        { name: Like(`%${nameSurname}%`), userId: userId },
        { surname: Like(`%${nameSurname}%`), userId: userId },
      ],
      select: ['id', 'name', 'surname'],
      skip: page * limit,
      take: limit,
    });

    return {
      results: ownersList,
      count: count,
    };
  }

  async deleteOwner(
    ownerId: string,
    userId: string,
  ): Promise<OwnerDeleteResponse> {
    const ownerToDelete = await this.ownerRepository.findOne({
      id: ownerId,
      userId: userId,
    });
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
    userId: string,
  ): Promise<AssignPetToOwnerResponse> {
    const { ownerId, petId } = assignPetToOwnerData;

    const owner = await this.ownerRepository.findOne({
      id: ownerId,
      userId: userId,
    });
    if (!owner) {
      throw new HttpException('Owner not found', HttpStatus.NOT_FOUND);
    }

    const pet = await this.petRepository.findOne({ id: petId, userId: userId });
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
