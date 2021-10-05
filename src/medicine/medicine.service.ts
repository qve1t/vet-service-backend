import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  MedicineDeleteResponse,
  MedicineListResponse,
  MedicineQueryInterface,
  MedicineRegisterResponse,
  MedicineUpdateResponse,
} from 'src/interfaces/medicine';
import { Like, Repository } from 'typeorm';
import { RegisterMedicineDto } from './dto/RegisterMedicine.dto';
import { UpdateMedicineDto } from './dto/UpdateMedicine.dto';
import { Medicine } from './medicine.entity';

@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(Medicine)
    private medicineRepository: Repository<Medicine>,
  ) {}

  async registerNewMedicine(
    registerMedicineData: RegisterMedicineDto,
    userId: string,
  ): Promise<MedicineRegisterResponse> {
    const foundMedicine = await this.medicineRepository.findOne({
      name: registerMedicineData.name,
      userId: userId,
    });

    if (foundMedicine) {
      throw new HttpException(
        'Medicine already registered',
        HttpStatus.CONFLICT,
      );
    }
    const newMedicine = this.medicineRepository.create({
      ...registerMedicineData,
      userId: userId,
    });

    await this.medicineRepository.save(newMedicine);

    return {
      id: newMedicine.id,
      status: 'ok',
    };
  }

  async updateMedicineInfo(
    updateMedicineInfoData: UpdateMedicineDto,
    userId: string,
  ): Promise<MedicineUpdateResponse> {
    let medicineToUpdate = await this.medicineRepository.findOne({
      id: updateMedicineInfoData.id,
      userId: userId,
    });

    if (!medicineToUpdate) {
      throw new HttpException('Medicine not found', HttpStatus.NOT_FOUND);
    }

    medicineToUpdate = { ...medicineToUpdate, ...updateMedicineInfoData };

    await this.medicineRepository.save(medicineToUpdate);

    return {
      id: medicineToUpdate.id,
      status: 'ok',
    };
  }

  async getMedicineDetails(
    medicineId: string,
    userId: string,
  ): Promise<Medicine> {
    const medicineToGet = await this.medicineRepository.findOne({
      id: medicineId,
      userId: userId,
    });

    if (!medicineToGet) {
      throw new HttpException('Medicine not found', HttpStatus.NOT_FOUND);
    }

    return medicineToGet;
  }

  async getMedicinesList(
    query: MedicineQueryInterface,
    userId: string,
  ): Promise<MedicineListResponse> {
    const page = query.page || 0;
    const limit = query.limit || 10;
    const text = query.searchText || '';

    const [medicinesList, count] = await this.medicineRepository.findAndCount({
      where: [
        { name: Like(`%${text}%`), userId: userId },
        { description: Like(`%${text}%`), userId: userId },
      ],
      skip: page * limit,
      take: limit,
    });

    return {
      results: medicinesList,
      count: count,
    };
  }

  async chengeMedicineMagazineCount(
    medicineId: string,
    changeValue: number,
    userId: string,
  ): Promise<MedicineUpdateResponse> {
    const medicineToChange = await this.medicineRepository.findOne({
      id: medicineId,
      userId: userId,
    });

    if (!medicineToChange) {
      throw new HttpException('Medicine not found', HttpStatus.NOT_FOUND);
    }

    medicineToChange.magazineCount += changeValue;

    await this.medicineRepository.save(medicineToChange);

    return {
      id: medicineToChange.id,
      status: 'ok',
    };
  }

  async deleteMedicine(
    medicineId: string,
    userId: string,
  ): Promise<MedicineDeleteResponse> {
    const medicineToDelete = await this.medicineRepository.findOne({
      id: medicineId,
      userId: userId,
    });
    if (!medicineToDelete) {
      throw new HttpException('Medicine not found', HttpStatus.NOT_FOUND);
    }

    await this.medicineRepository.delete(medicineId);

    return {
      id: medicineId,
      status: 'ok',
    };
  }
}
