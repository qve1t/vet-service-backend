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
  AssignOwnerToPetResponse,
  PetDeleteResponse,
  PetRegisterResponse,
} from 'src/interfaces/pet';
import { assignOwnerToPetDto } from './dto/assignOwnerToPet';
import { registerPetDto } from './dto/registerPet.dto';
import { PetService } from './pet.service';

@Controller('pet')
export class PetController {
  constructor(@Inject(PetService) private readonly petService: PetService) {}

  @Post('/register')
  async registerNewPet(
    @Body() registerPetData: registerPetDto,
  ): Promise<PetRegisterResponse> {
    return await this.petService.registerNewPet(registerPetData);
  }

  @Delete('/delete/:petId')
  async deletePet(@Param('petId') petId: string): Promise<PetDeleteResponse> {
    return await this.petService.deletePet(petId);
  }

  @Put('/assign-owner')
  async assignOwnerToPet(
    @Body() assignOwnerToPetData: assignOwnerToPetDto,
  ): Promise<AssignOwnerToPetResponse> {
    return await this.petService.assignOwnerToPet(assignOwnerToPetData);
  }
}
