import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visit } from './visit.entity';

@Injectable()
export class VisitService {
  constructor(
    @InjectRepository(Visit) private visitRepository: Repository<Visit>,
  ) {}
}
