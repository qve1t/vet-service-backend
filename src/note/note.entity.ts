import { NoteInterface } from '../interfaces/note';
import { Owner } from '../owner/owner.entity';
import { Pet } from '../pet/pet.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class Note implements NoteInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 2000,
    default: '',
  })
  text: string;

  @Column({
    nullable: false,
  })
  dateTime: Date;

  @ManyToOne(() => Pet, (entity) => entity.notes)
  petNote: Pet;

  @ManyToOne(() => Owner, (entity) => entity.notes)
  ownerNote: Owner;

  @Column()
  userId: string;
}
