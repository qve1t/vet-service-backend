import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { NoteUpdateInterface } from '../../interfaces/note';

export class UpdateNoteDto implements NoteUpdateInterface {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  text: string | null;

  @IsOptional()
  ownerId: string | null;

  @IsOptional()
  petId: string | null;
}
