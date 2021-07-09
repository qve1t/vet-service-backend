import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from '../owner/owner.entity';
import { Pet } from '../pet/pet.entity';
import { Between, Repository } from 'typeorm';
import { Visit } from './visit.entity';
import { RegisterVisitDto } from './dto/registerVisit.dto';
import {
  VisitRegisterResponse,
  VisitDeleteResponse,
  VisitUpdateResponse,
  VisitGetQuery,
  VisitListReponse,
} from '../interfaces/visit';
import { UpdateVisitDto } from './dto/updateVisit.dto';

@Injectable()
export class VisitService {
  constructor(
    @InjectRepository(Visit) private visitRepository: Repository<Visit>,
    @InjectRepository(Pet) private petRepository: Repository<Pet>,
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
  ) {}

  async registerVisit(
    registerVisitData: RegisterVisitDto,
  ): Promise<VisitRegisterResponse> {
    const sameHourVisit = await this.visitRepository.findOne({
      dateTime: registerVisitData.dateTime,
    });
    if (sameHourVisit) {
      throw new HttpException(
        'Another visit already planned for that time',
        HttpStatus.CONFLICT,
      );
    }

    const visitPet = await this.petRepository.findOne(registerVisitData.petId);
    if (!visitPet) {
      throw new HttpException('Pet not found', HttpStatus.NOT_FOUND);
    }

    const visitOwner = await this.ownerRepository.findOne(
      registerVisitData.ownerId,
    );
    if (!visitOwner) {
      throw new HttpException('Owner not found', HttpStatus.NOT_FOUND);
    }

    const newVisit = this.visitRepository.create({
      ...registerVisitData,
      petOnVisit: visitPet,
      ownerOnVisit: visitOwner,
    });

    await this.visitRepository.save(newVisit);

    return {
      id: newVisit.id,
      status: 'ok',
    };
  }

  async updateVisit(
    updateVisitData: UpdateVisitDto,
  ): Promise<VisitUpdateResponse> {
    let visitToUpdate = await this.visitRepository.findOne(updateVisitData.id);

    if (!visitToUpdate) {
      throw new HttpException('Visit not found', HttpStatus.NOT_FOUND);
    }

    visitToUpdate = { ...visitToUpdate, ...updateVisitData };

    await this.visitRepository.save(visitToUpdate);

    return {
      id: updateVisitData.id,
      status: 'ok',
    };
  }

  async getVisitDetails(visitId: string): Promise<Visit> {
    const visitToGet = await this.visitRepository.findOne(visitId, {
      relations: ['petOnVisit', 'ownerOnVisit'],
    });

    if (!visitToGet) {
      throw new HttpException('Visit not found', HttpStatus.NOT_FOUND);
    }

    return visitToGet;
  }

  async getVisitsForDay(query: VisitGetQuery): Promise<VisitListReponse> {
    const { startDate, endDate } = query;
    const listOfVisits = await this.visitRepository.find({
      where: {
        dateTime: Between(startDate, endDate),
      },
      select: ['id', 'dateTime', 'name'],
    });

    return listOfVisits;
  }

  async deleteVisit(visitId: string): Promise<VisitDeleteResponse> {
    const visitToDelete = this.visitRepository.findOne(visitId);

    if (!visitToDelete) {
      throw new HttpException('Visit not found', HttpStatus.NOT_FOUND);
    }

    await this.visitRepository.delete(visitId);

    return {
      id: visitId,
      status: 'ok',
    };
  }
}
