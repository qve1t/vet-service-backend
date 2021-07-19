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
import { User } from '../user/user.entity';
import { UserObject } from '../decorators/userObject.decorator';
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
@UseGuards(AuthGuard('jwt'))
export class OwnerController {
  constructor(
    @Inject(OwnerService) private readonly ownerService: OwnerService,
  ) {}

  @Get('/')
  async getOwnersList(
    @Query() query: OwnerQueryInterface,
    @UserObject() user: User,
  ): Promise<OwnerListResponse> {
    return await this.ownerService.getOwnersList(query, user.id);
  }

  @Patch('/update')
  async updateOwnerInfo(
    @Body() updateOwnerInfoData: updateOwnerInfoDto,
    @UserObject() user: User,
  ): Promise<OwnerUpdateResponse> {
    return await this.ownerService.updateOwnerInfo(
      updateOwnerInfoData,
      user.id,
    );
  }

  @Get('/:ownerId')
  async getOwnerDetails(
    @Param('ownerId', ParseUUIDPipe) ownerId: string,
    @UserObject() user: User,
  ): Promise<Owner> {
    return await this.ownerService.getOwnerDetails(ownerId, user.id);
  }

  @Post('/register')
  async registerNewOwner(
    @Body() registerOwnerData: registerOwnerDto,
    @UserObject() user: User,
  ): Promise<OwnerRegisterResponse> {
    return await this.ownerService.registerNewOwner(registerOwnerData, user.id);
  }

  @Delete('/delete/:ownerId')
  async deleteOwner(
    @Param('ownerId', ParseUUIDPipe) ownerId: string,
    @UserObject() user: User,
  ): Promise<OwnerDeleteResponse> {
    return await this.ownerService.deleteOwner(ownerId, user.id);
  }

  @Put('/assing-pet')
  async assingPetToOwner(
    @Body() assignPetToOwnerData: assignPetToOwnerDto,
    @UserObject() user: User,
  ): Promise<AssignPetToOwnerResponse> {
    return await this.ownerService.assignPetToOwner(
      assignPetToOwnerData,
      user.id,
    );
  }
}
