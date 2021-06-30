import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  AssignPetToOwnerResponse,
  OwnerDeleteResponse,
  OwnerRegisterResponse,
} from 'src/interfaces/owner';
import { assignPetToOwnerDto } from './dto/assignPetToOwnerDto';
import { registerOwnerDto } from './dto/registerOwnerDto';
import { OwnerService } from './owner.service';

@Controller('owner')
export class OwnerController {
  constructor(
    @Inject(OwnerService) private readonly ownerService: OwnerService,
  ) {}

  @Post('/register')
  async registerNewOwner(
    @Body() registerOwnerData: registerOwnerDto,
  ): Promise<OwnerRegisterResponse> {
    return await this.ownerService.registerNewOwner(registerOwnerData);
  }

  @Delete('/delete/:ownerId')
  async deleteOwner(
    @Param('ownerId') ownerId: string,
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
