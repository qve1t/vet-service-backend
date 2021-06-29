import { Body, Controller, Delete, Inject, Param, Post } from '@nestjs/common';
import {
  OwnerDeleteResponse,
  OwnerRegisterResponse,
} from 'src/interfaces/owner';
import { registerOwnerDto } from './dto/registerOwnerDto';
import { OwnerService } from './owner.service';

@Controller('owner')
export class OwnerController {
  constructor(
    @Inject(OwnerService) private readonly ownerService: OwnerService,
  ) {}

  @Post('register')
  async registerNewOwner(
    @Body() registerOwnerData: registerOwnerDto,
  ): Promise<OwnerRegisterResponse> {
    return await this.ownerService.registerNewOwner(registerOwnerData);
  }

  @Delete('delete/:ownerId')
  async deleteOwner(
    @Param('ownerId') ownerId: string,
  ): Promise<OwnerDeleteResponse> {
    return await this.ownerService.deleteOwner(ownerId);
  }
}
