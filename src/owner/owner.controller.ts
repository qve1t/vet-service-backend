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
  Put,
  Query,
} from '@nestjs/common';
import {
  AssignPetToOwnerResponse,
  OwnerDeleteResponse,
  OwnerListResponse,
  OwnerQueryInterface,
  OwnerRegisterResponse,
  OwnerUpdateResponse,
} from '../interfaces/owner';
import { assignPetToOwnerDto } from './dto/assignPetToOwner.dto';
import { registerOwnerDto } from './dto/registerOwner.dto';
import { updateOwnerInfoDto } from './dto/updateOwnerInfo.dto';
import { Owner } from './owner.entity';
import { OwnerService } from './owner.service';

@Controller('owner')
export class OwnerController {
  constructor(
    @Inject(OwnerService) private readonly ownerService: OwnerService,
  ) {}

  @Get('/')
  async getOwnersList(
    @Query() query: OwnerQueryInterface,
  ): Promise<OwnerListResponse> {
    return await this.ownerService.getOwnersList(query);
  }

  @Patch('/update')
  async updateOwnerInfo(
    @Body() updateOwnerInfoData: updateOwnerInfoDto,
  ): Promise<OwnerUpdateResponse> {
    return await this.ownerService.updateOwnerInfo(updateOwnerInfoData);
  }

  @Get('/:ownerId')
  async getOwnerDetails(
    @Param('ownerId', ParseUUIDPipe) ownerId: string,
  ): Promise<Owner> {
    return await this.ownerService.getOwnerDetails(ownerId);
  }

  @Post('/register')
  async registerNewOwner(
    @Body() registerOwnerData: registerOwnerDto,
  ): Promise<OwnerRegisterResponse> {
    return await this.ownerService.registerNewOwner(registerOwnerData);
  }

  @Delete('/delete/:ownerId')
  async deleteOwner(
    @Param('ownerId', ParseUUIDPipe) ownerId: string,
  ): Promise<OwnerDeleteResponse> {
    return await this.ownerService.deleteOwner(ownerId);
  }

  @Put('/assing-pet')
  async assingPetToOwner(
    @Body() assignPetToOwnerData: assignPetToOwnerDto,
  ): Promise<AssignPetToOwnerResponse> {
    return await this.ownerService.assignPetToOwner(assignPetToOwnerData);
  }
}
