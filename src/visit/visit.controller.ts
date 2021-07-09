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
} from '@nestjs/common';
import {
  VisitDeleteResponse,
  VisitGetQuery,
  VisitListReponse,
  VisitRegisterResponse,
  VisitUpdateResponse,
} from '../interfaces/visit';
import { RegisterVisitDto } from './dto/registerVisit.dto';
import { UpdateVisitDto } from './dto/updateVisit.dto';
import { Visit } from './visit.entity';
import { VisitService } from './visit.service';

@Controller('visit')
export class VisitController {
  constructor(
    @Inject(VisitService) private readonly visitService: VisitService,
  ) {}

  @Get('/')
  async getVisitsList(
    @Query() query: VisitGetQuery,
  ): Promise<VisitListReponse> {
    return await this.visitService.getVisitsForDay(query);
  }

  @Get('/:visitId')
  async getVisitDetails(
    @Param('visitId', ParseUUIDPipe) visitId: string,
  ): Promise<Visit> {
    return await this.visitService.getVisitDetails(visitId);
  }

  @Post('/register')
  async registerNewVisit(
    @Body() visitRegisterData: RegisterVisitDto,
  ): Promise<VisitRegisterResponse> {
    return await this.visitService.registerVisit(visitRegisterData);
  }

  @Patch('/update')
  async updateVisit(
    @Body() visitUpdateData: UpdateVisitDto,
  ): Promise<VisitUpdateResponse> {
    return await this.visitService.updateVisit(visitUpdateData);
  }

  @Delete('delete/:visitId')
  async deleteVisit(
    @Param('visitId', ParseUUIDPipe) visitId: string,
  ): Promise<VisitDeleteResponse> {
    return await this.visitService.deleteVisit(visitId);
  }
}
