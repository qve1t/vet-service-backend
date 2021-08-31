import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Pet } from '../pet/pet.entity';
import { Owner } from '../owner/owner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Pet, Owner])],
  providers: [NoteService],
  controllers: [NoteController],
})
export class NoteModule {}
