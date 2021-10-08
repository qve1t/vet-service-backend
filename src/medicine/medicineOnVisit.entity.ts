import { Visit } from '../visit/visit.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Medicine } from './medicine.entity';

@Entity()
export class MedicineOnVisit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Visit, (entity) => entity.medicinesOnVisit)
  visit: Visit;

  @ManyToOne(() => Medicine, (entity) => entity.visits)
  medicine: Medicine;

  @Column()
  count: number;

  @Column()
  userId: string;
}
