import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserObject } from '../decorators/userObject.decorator';
import {
  MedicineDeleteResponse,
  MedicineListResponse,
  MedicineQueryInterface,
  MedicineRegisterResponse,
  MedicineUpdateResponse,
} from '../interfaces/medicine';
import { User } from '../user/user.entity';
import { RegisterMedicineDto } from './dto/RegisterMedicine.dto';
import { UpdateMedicineDto } from './dto/UpdateMedicine.dto';
import { Medicine } from './medicine.entity';
import { MedicineService } from './medicine.service';

@Controller('medicine')
@UseGuards(AuthGuard('jwt'))
export class MedicineController {
  constructor(
    @Inject(MedicineService) private readonly medicineService: MedicineService,
  ) {}

  @Get('/')
  async getMedicinesLust(
    @Query() query: MedicineQueryInterface,
    @UserObject() user: User,
  ): Promise<MedicineListResponse> {
    return await this.medicineService.getMedicinesList(query, user.id);
  }

  @Get('/:medicineId')
  async getMedicineDetails(
    @Param('medicineId', ParseUUIDPipe) medicineId: string,
    @UserObject() user: User,
  ): Promise<Medicine> {
    return await this.medicineService.getMedicineDetails(medicineId, user.id);
  }

  @Post('/register')
  async registerNewMedicine(
    @Body() registerMedicineData: RegisterMedicineDto,
    @UserObject() user: User,
  ): Promise<MedicineRegisterResponse> {
    return await this.medicineService.registerNewMedicine(
      registerMedicineData,
      user.id,
    );
  }

  @Patch('/update')
  async updateMedicineInfo(
    @Body() updateMedicineInfoData: UpdateMedicineDto,
    @UserObject() user: User,
  ): Promise<MedicineUpdateResponse> {
    return await this.medicineService.updateMedicineInfo(
      updateMedicineInfoData,
      user.id,
    );
  }

  @Delete('/delete/:medicineId')
  async deleteMedicine(
    @Param('medicineId', ParseUUIDPipe) medicineId: string,
    @UserObject() user: User,
  ): Promise<MedicineDeleteResponse> {
    return await this.medicineService.deleteMedicine(medicineId, user.id);
  }
}
