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
import {
  NoteDayQuery,
  NoteDeleteResponse,
  NoteListResponse,
  NoteQueryInterface,
  NoteRegisterResponse,
  NoteUpdateResponse,
} from '../interfaces/note';
import { User } from '../user/user.entity';
import { RegisterNoteDto } from './dto/RegisterNote.dto';
import { UpdateNoteDto } from './dto/UpdateNote.dto';
import { NoteService } from './note.service';

@Controller('note')
@UseGuards(AuthGuard('jwt'))
export class NoteController {
  constructor(@Inject(NoteService) private readonly noteService: NoteService) {}

  @Get('/')
  async getNotesList(
    @Query() query: NoteQueryInterface,
    @UserObject() user: User,
  ): Promise<NoteListResponse> {
    return await this.noteService.getNotesList(query, user.id);
  }

  @Get('/day')
  async getNotesForDay(
    @Query() query: NoteDayQuery,
    @UserObject() user: User,
  ): Promise<NoteListResponse> {
    return await this.noteService.getNotesForDay(query, user.id);
  }

  @Post('/register')
  async registerNewNote(
    @Body() noteRegisterData: RegisterNoteDto,
    @UserObject() user: User,
  ): Promise<NoteRegisterResponse> {
    return await this.noteService.registerNewNote(noteRegisterData, user.id);
  }

  @Patch('/update')
  async updateNote(
    @Body() noteUpdateData: UpdateNoteDto,
    @UserObject() user: User,
  ): Promise<NoteUpdateResponse> {
    return await this.noteService.updateNote(noteUpdateData, user.id);
  }

  @Delete('delete/:noteId')
  async deleteNote(
    @Param('noteId', ParseUUIDPipe) noteId: string,
    @UserObject() user: User,
  ): Promise<NoteDeleteResponse> {
    return await this.noteService.deleteNote(noteId, user.id);
  }
}
