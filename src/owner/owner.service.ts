import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  OwnerDeleteResponse,
  OwnerRegisterResponse,
} from 'src/interfaces/owner';
import { Repository } from 'typeorm';
import { registerOwnerDto } from './dto/registerOwnerDto';
import { Owner } from './owner.entity';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
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
}
