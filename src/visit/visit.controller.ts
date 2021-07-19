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
import { User } from '../user/user.entity';
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
@UseGuards(AuthGuard('jwt'))
export class VisitController {
  constructor(
    @Inject(VisitService) private readonly visitService: VisitService,
  ) {}

  @Get('/')
  async getVisitsList(
    @Query() query: VisitGetQuery,
    @UserObject() user: User,
  ): Promise<VisitListReponse> {
    return await this.visitService.getVisitsForDay(query, user.id);
  }

  @Get('/:visitId')
  async getVisitDetails(
    @Param('visitId', ParseUUIDPipe) visitId: string,
    @UserObject() user: User,
  ): Promise<Visit> {
    return await this.visitService.getVisitDetails(visitId, user.id);
  }

  @Post('/register')
  async registerNewVisit(
    @Body() visitRegisterData: RegisterVisitDto,
    @UserObject() user: User,
  ): Promise<VisitRegisterResponse> {
    return await this.visitService.registerVisit(visitRegisterData, user.id);
  }

  @Patch('/update')
  async updateVisit(
    @Body() visitUpdateData: UpdateVisitDto,
    @UserObject() user: User,
  ): Promise<VisitUpdateResponse> {
    return await this.visitService.updateVisit(visitUpdateData, user.id);
  }

  @Delete('delete/:visitId')
  async deleteVisit(
    @Param('visitId', ParseUUIDPipe) visitId: string,
    @UserObject() user: User,
  ): Promise<VisitDeleteResponse> {
    return await this.visitService.deleteVisit(visitId, user.id);
  }
}
