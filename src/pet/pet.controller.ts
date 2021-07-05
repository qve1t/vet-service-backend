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
  AssignOwnerToPetResponse,
  PetDeleteResponse,
  PetListResponse,
  PetQueryInterface,
  PetRegisterResponse,
  PetUpdateResponse,
} from '../interfaces/pet';
import { assignOwnerToPetDto } from './dto/assignOwnerToPet';
import { registerPetDto } from './dto/registerPet.dto';
import { updatePetInfoDto } from './dto/updatePetInfo.dto';
import { Pet } from './pet.entity';
import { PetService } from './pet.service';

@Controller('pet')
export class PetController {
  constructor(@Inject(PetService) private readonly petService: PetService) {}

  @Get('/')
  async getPetsList(
    @Query() query: PetQueryInterface,
  ): Promise<PetListResponse> {
    return await this.petService.getPetsList(query);
  }

  @Get('/:petId')
  async getPetDetails(
    @Param('petId', ParseUUIDPipe) petId: string,
  ): Promise<Pet> {
    return await this.petService.getPetDetails(petId);
  }

  @Post('/register')
  async registerNewPet(
    @Body() registerPetData: registerPetDto,
  ): Promise<PetRegisterResponse> {
    return await this.petService.registerNewPet(registerPetData);
  }

  @Patch('/update')
  async updatePetInfo(
    @Body() updatePetInfoData: updatePetInfoDto,
  ): Promise<PetUpdateResponse> {
    return await this.petService.updatePetInfo(updatePetInfoData);
  }

  @Delete('/delete/:petId')
  async deletePet(
    @Param('petId', ParseUUIDPipe) petId: string,
  ): Promise<PetDeleteResponse> {
    return await this.petService.deletePet(petId);
  }

  @Put('/assign-owner')
  async assignOwnerToPet(
    @Body() assignOwnerToPetData: assignOwnerToPetDto,
  ): Promise<AssignOwnerToPetResponse> {
    return await this.petService.assignOwnerToPet(assignOwnerToPetData);
  }
}
