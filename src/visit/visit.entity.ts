import { Medicine } from '../medicine/medicine.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { VisitInterface } from '../interfaces/visit';
import { Owner } from '../owner/owner.entity';
import { Pet } from '../pet/pet.entity';
import { MedicineOnVisit } from '../medicine/medicineOnVisit.entity';

export interface SingleMedicineListElem {
  medicine: Medicine;
  count: number;
}

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

  @OneToMany(() => MedicineOnVisit, (entity) => entity.visit)
  medicinesOnVisit: Medicine[];

  @Column()
  userId: string;
}
