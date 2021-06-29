import { Body, Controller, Delete, Inject, Param, Post } from '@nestjs/common';
import { PetDeleteResponse, PetRegisterResponse } from 'src/interfaces/pet';
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
}
