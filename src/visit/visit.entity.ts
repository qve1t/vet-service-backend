import { Medicine } from 'src/medicine/medicine.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
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

  @ManyToOne(() => Pet, (entity) => entity.visits, {
    onDelete: 'SET NULL',
  })
  petOnVisit: Pet;

  @ManyToOne(() => Owner, (entity) => entity.visits, {
    onDelete: 'SET NULL',
  })
  ownerOnVisit: Owner;

  @ManyToMany(() => Medicine, (entity) => entity.visits)
  @JoinTable()
  medicinesOnVisit: Array<{
    count: number;
    medicine: Medicine;
  }>;

  @Column()
  userId: string;
}
