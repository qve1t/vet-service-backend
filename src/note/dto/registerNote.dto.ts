import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { NoteRegisterInterface } from '../../interfaces/note';

export class RegisterNoteDto implements NoteRegisterInterface {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsDate()
  dateTime: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  petId: string | null;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  ownerId: string | null;
}
