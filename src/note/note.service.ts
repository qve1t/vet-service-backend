import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  NoteDayQuery,
  NoteDeleteResponse,
  NoteListResponse,
  NoteQueryInterface,
  NoteRegisterResponse,
  NoteUpdateResponse,
} from '../interfaces/note';
import { Owner } from '../owner/owner.entity';
import { Pet } from '../pet/pet.entity';
import { Between, Like, Repository } from 'typeorm';
import { RegisterNoteDto } from './dto/RegisterNote.dto';
import { UpdateNoteDto } from './dto/UpdateNote.dto';
import { Note } from './note.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note) private noteRepository: Repository<Note>,
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
    @InjectRepository(Pet) private petRepository: Repository<Pet>,
  ) {}

  async getNotesList(
    query: NoteQueryInterface,
    userId: string,
  ): Promise<NoteListResponse> {
    const page = query.page || 0;
    const limit = query.limit || 10;
    const searchText = query.text || '';

    const [notesList, count] = await this.noteRepository
      .createQueryBuilder('note')
      .leftJoinAndSelect('note.petNote', 'pet')
      .leftJoinAndSelect('note.ownerNote', 'owner')
      .select([
        'note.id',
        'note.text',
        'note.dateTime',
        'pet.id',
        'pet.name',
        'owner.id',
        'owner.name',
        'owner.surname',
      ])
      .skip(page * limit)
      .take(limit)
      .where({ text: Like(`%${searchText}%`), userId: userId })
      .getManyAndCount();

    return {
      results: notesList,
      count: count,
    };
  }

  async getNotesForDay(
    query: NoteDayQuery,
    userId: string,
  ): Promise<NoteListResponse> {
    const { startDate, endDate } = query;
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (isNaN(parsedStartDate.valueOf()) || isNaN(parsedEndDate.valueOf())) {
      throw new HttpException(
        'Date values are invalid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const [notesList, count] = await this.noteRepository
      .createQueryBuilder('note')
      .leftJoinAndSelect('note.petNote', 'pet')
      .leftJoinAndSelect('note.ownerNote', 'owner')
      .select([
        'note.id',
        'note.text',
        'note.dateTime',
        'pet.id',
        'pet.name',
        'owner.id',
        'owner.name',
        'owner.surname',
      ])
      .where({
        dateTime: Between(parsedStartDate, parsedEndDate),
        userId: userId,
      })
      .getManyAndCount();

    return {
      results: notesList,
      count: count,
    };
  }

  async registerNewNote(
    registerNoteData: RegisterNoteDto,
    userId: string,
  ): Promise<NoteRegisterResponse> {
    const parsedDate = registerNoteData.dateTime
      ? new Date(registerNoteData.dateTime)
      : null;

    if (parsedDate && isNaN(parsedDate.valueOf())) {
      throw new HttpException('Date value is invalid', HttpStatus.BAD_REQUEST);
    }

    const newNote = this.noteRepository.create({
      text: registerNoteData.text,
      dateTime: parsedDate,
      petNote: null,
      ownerNote: null,
      userId: userId,
    });

    const owner = await this.ownerRepository.findOne({
      id: registerNoteData.ownerId,
      userId: userId,
    });
    if (owner) {
      newNote.ownerNote = owner;
    }

    const pet = await this.petRepository.findOne({
      id: registerNoteData.petId,
      userId: userId,
    });
    if (pet) {
      newNote.petNote = pet;
    }

    await this.noteRepository.save(newNote);

    return {
      id: newNote.id,
      status: 'ok',
    };
  }

  async updateNote(
    updateNoteData: UpdateNoteDto,
    userId: string,
  ): Promise<NoteUpdateResponse> {
    const noteToUpdate = await this.noteRepository.findOne({
      id: updateNoteData.id,
      userId: userId,
    });

    if (!noteToUpdate) {
      throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
    }

    noteToUpdate.text = updateNoteData.text;

    const owner = await this.ownerRepository.findOne({
      id: updateNoteData.ownerId,
      userId: userId,
    });
    if (owner) {
      noteToUpdate.ownerNote = owner;
    }

    const pet = await this.petRepository.findOne({
      id: updateNoteData.petId,
      userId: userId,
    });
    if (pet) {
      noteToUpdate.petNote = pet;
    }

    await this.noteRepository.save(noteToUpdate);

    return {
      id: noteToUpdate.id,
      status: 'ok',
    };
  }

  async deleteNote(
    noteId: string,
    userId: string,
  ): Promise<NoteDeleteResponse> {
    const noteToDelete = await this.noteRepository.findOne({
      id: noteId,
      userId: userId,
    });

    if (!noteToDelete) {
      throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
    }

    await this.noteRepository.delete(noteId);

    return {
      id: noteId,
      status: 'ok',
    };
  }
}
