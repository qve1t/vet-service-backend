import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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
  VisitUpdateSingleMedicine,
} from '../interfaces/visit';
import { UpdateVisitDto } from './dto/updateVisit.dto';
import { MedicineService } from '../medicine/medicine.service';

@Injectable()
export class VisitService {
  constructor(
    @Inject(MedicineService) private readonly medicineService: MedicineService,
    @InjectRepository(Visit) private visitRepository: Repository<Visit>,
    @InjectRepository(Pet) private petRepository: Repository<Pet>,
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
  ) {}

  async registerVisit(
    registerVisitData: RegisterVisitDto,
    userId: string,
  ): Promise<VisitRegisterResponse> {
    const parsedDate = new Date(registerVisitData.dateTime);
    //check if dates are valid
    if (isNaN(parsedDate.valueOf())) {
      throw new HttpException(
        'Date values are invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const sameHourVisit = await this.visitRepository.findOne({
      dateTime: registerVisitData.dateTime,
      userId: userId,
    });
    if (sameHourVisit) {
      throw new HttpException(
        'Another visit already planned for that time',
        HttpStatus.CONFLICT,
      );
    }

    const visitPet = await this.petRepository.findOne({
      id: registerVisitData.petId,
      userId: userId,
    });
    if (!visitPet) {
      throw new HttpException('Pet not found', HttpStatus.NOT_FOUND);
    }

    const visitOwner = await this.ownerRepository.findOne({
      id: registerVisitData.ownerId,
      userId: userId,
    });
    if (!visitOwner) {
      throw new HttpException('Owner not found', HttpStatus.NOT_FOUND);
    }

    const newVisit = this.visitRepository.create({
      ...registerVisitData,
      dateTime: parsedDate,
      petOnVisit: visitPet,
      ownerOnVisit: visitOwner,
      userId: userId,
    });

    await this.visitRepository.save(newVisit);

    return {
      id: newVisit.id,
      status: 'ok',
    };
  }

  async updateVisit(
    updateVisitData: UpdateVisitDto,
    userId: string,
  ): Promise<VisitUpdateResponse> {
    let visitToUpdate = await this.visitRepository.findOne({
      id: updateVisitData.id,
      userId: userId,
    });

    if (!visitToUpdate) {
      throw new HttpException('Visit not found', HttpStatus.NOT_FOUND);
    }

    const medicines = updateVisitData.medicines;
    delete updateVisitData.medicines;

    const parsedDate = updateVisitData.dateTime
      ? new Date(updateVisitData.dateTime)
      : null;
    //check if dates are valid
    if (parsedDate && isNaN(parsedDate.valueOf())) {
      throw new HttpException(
        'Date values are invalid',
        HttpStatus.BAD_REQUEST,
      );
    }

    visitToUpdate = {
      ...visitToUpdate,
      ...updateVisitData,
      ...(parsedDate && { dateTime: parsedDate }),
    };

    if (Array.isArray(medicines)) {
      await Promise.all(
        //update or add medicines from the array
        medicines.map(async (elem: VisitUpdateSingleMedicine) => {
          //check if meddicine is already assigned to the visit
          const medicineToUpdate =
            await this.medicineService.getMedicineOnVisit(
              updateVisitData.id,
              elem.medicineId,
              userId,
            );
          //if medicine is already assigned to the visit, update it
          if (medicineToUpdate) {
            const countDifference = elem.count - medicineToUpdate.count;
            medicineToUpdate.count = elem.count;

            await this.medicineService.saveUpdatedMedicineOnVisit(
              medicineToUpdate,
            );
            //change magazine count of medicine
            await this.medicineService.chengeMedicineMagazineCount(
              elem.medicineId,
              countDifference,
              userId,
            );
            //otherwise create new assign
          } else {
            const medicineToUpdate =
              await this.medicineService.getMedicineDetails(
                elem.medicineId,
                userId,
              );
            //check if medicine exists and assign it
            if (medicineToUpdate) {
              await this.medicineService.addMedicineToVisit(
                visitToUpdate,
                medicineToUpdate,
                elem.count,
                userId,
              );

              //change magazine count of medicine
              await this.medicineService.chengeMedicineMagazineCount(
                elem.medicineId,
                elem.count,
                userId,
              );
            }
          }
        }),
      );
    }

    await this.visitRepository.save(visitToUpdate);

    return {
      id: updateVisitData.id,
      status: 'ok',
    };
  }

  async getVisitDetails(visitId: string, userId: string): Promise<Visit> {
    const visitToGet = await this.visitRepository
      .createQueryBuilder('visit')
      .leftJoinAndSelect('visit.petOnVisit', 'pet')
      .leftJoinAndSelect('visit.ownerOnVisit', 'owner')
      .leftJoinAndSelect('visit.medicinesOnVisit', 'medicinesOnVisit')
      .leftJoinAndSelect('medicinesOnVisit.medicine', 'medicine')
      .where({ id: visitId, userId: userId })
      .select([
        'visit.id',
        'visit.dateTime',
        'visit.name',
        'visit.note',
        'visit.interview',
        'visit.description',
        'visit.healing',
        'pet.id',
        'pet.name',
        'pet.type',
        'owner.id',
        'owner.name',
        'owner.surname',
        'medicinesOnVisit',
        'medicine',
      ])
      .getOne();

    if (!visitToGet) {
      throw new HttpException('Visit not found', HttpStatus.NOT_FOUND);
    }

    return visitToGet;
  }

  async getVisitsForDay(
    query: VisitGetQuery,
    userId: string,
  ): Promise<VisitListReponse> {
    const { startDate, endDate } = query;
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
    //check if dates are valid
    if (isNaN(parsedStartDate.valueOf()) || isNaN(parsedEndDate.valueOf())) {
      throw new HttpException(
        'Date values are invalid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const listOfVisits = await this.visitRepository.find({
      where: {
        dateTime: Between(parsedStartDate, parsedEndDate),
        userId: userId,
      },
      select: ['id', 'dateTime', 'name'],
    });

    return listOfVisits;
  }

  async deleteVisit(
    visitId: string,
    userId: string,
  ): Promise<VisitDeleteResponse> {
    const visitToDelete = this.visitRepository.findOne({
      id: visitId,
      userId: userId,
    });

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
