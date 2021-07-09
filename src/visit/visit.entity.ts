import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { VisitInterface } from '../interfaces/visit';
import { Owner } from '../owner/owner.entity';
import { Pet } from '../pet/pet.entity';

@Entity()
export class Visit implements VisitInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  dateTime: Date;

  @Column({
    length: 600,
  })
  name: string;

  @Column({
    length: 2000,
  })
  note: string | null;

  @Column({
    type: 'longtext',
    default: '',
  })
  interview: string | null;

  @Column({
    type: 'longtext',
    default: '',
  })
  description: string | null;

  @Column({
    type: 'longtext',
    default: '',
  })
  healing: string | null;

  @ManyToOne(() => Pet, (entity) => entity.visits)
  petOnVisit: Pet;

  @ManyToOne(() => Owner, (entity) => entity.visits)
  ownerOnVisit: Owner;
}
