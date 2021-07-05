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
    type: 'longtext',
    default: '',
  })
  interview: string;

  @Column({
    type: 'longtext',
    default: '',
  })
  description: string;

  @Column({
    type: 'longtext',
    default: '',
  })
  healing: string;

  @ManyToOne(() => Pet, (entity) => entity.visits)
  petOnVisit: Pet;

  @ManyToOne(() => Owner, (entity) => entity.visits)
  ownerOnVisit: Owner;
}
