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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserObject } from '../decorators/userObject.decorator';
import { User } from '../user/user.entity';
import {
  AssignOwnerToPetResponse,
  PetDeleteResponse,
  PetListResponse,
  PetQueryInterface,
  PetRegisterResponse,
  PetUpdateResponse,
} from '../interfaces/pet';
import { assignOwnerToPetDto } from './dto/assignOwnerToPet.dto';
import { registerPetDto } from './dto/registerPet.dto';
import { updatePetInfoDto } from './dto/updatePetInfo.dto';
import { Pet } from './pet.entity';
import { PetService } from './pet.service';

@Controller('pet')
@UseGuards(AuthGuard('jwt'))
export class PetController {
  constructor(@Inject(PetService) private readonly petService: PetService) {}

  @Get('/')
  async getPetsList(
    @Query() query: PetQueryInterface,
    @UserObject() user: User,
  ): Promise<PetListResponse> {
    return await this.petService.getPetsList(query, user.id);
  }

  @Get('/:petId')
  async getPetDetails(
    @Param('petId', ParseUUIDPipe) petId: string,
    @UserObject() user: User,
  ): Promise<Pet> {
    return await this.petService.getPetDetails(petId, user.id);
  }

  @Post('/register')
  async registerNewPet(
    @Body() registerPetData: registerPetDto,
    @UserObject() user: User,
  ): Promise<PetRegisterResponse> {
    return await this.petService.registerNewPet(registerPetData, user.id);
  }

  @Patch('/update')
  async updatePetInfo(
    @Body() updatePetInfoData: updatePetInfoDto,
    @UserObject() user: User,
  ): Promise<PetUpdateResponse> {
    return await this.petService.updatePetInfo(updatePetInfoData, user.id);
  }

  @Delete('/delete/:petId')
  async deletePet(
    @Param('petId', ParseUUIDPipe) petId: string,
    @UserObject() user: User,
  ): Promise<PetDeleteResponse> {
    return await this.petService.deletePet(petId, user.id);
  }

  @Put('/assign-owner')
  async assignOwnerToPet(
    @Body() assignOwnerToPetData: assignOwnerToPetDto,
    @UserObject() user: User,
  ): Promise<AssignOwnerToPetResponse> {
    return await this.petService.assignOwnerToPet(
      assignOwnerToPetData,
      user.id,
    );
  }
}
