import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Visit } from '../visit/visit.entity';
import { MedicineInterface } from '../interfaces/medicine';
import { MedicineOnVisit } from './medicineOnVisit.entity';

@Entity()
export class Medicine implements MedicineInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    length: 128,
  })
  name: string;

  @Column({
    nullable: true,
    default: null,
    length: 1000,
  })
  description: string | null;

  @Column({
    nullable: false,
    default: 0,
  })
  count: number;

  @Column({
    nullable: false,
    default: 0,
  })
  magazineCount: number;

  @OneToMany(() => MedicineOnVisit, (entity) => entity.medicine)
  visits: Visit[];

  @Column()
  userId: string;
}
