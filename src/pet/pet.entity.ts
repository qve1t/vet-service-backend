import { PetInterface, PetSexes } from 'src/interfaces/pet';
import { Owner } from 'src/owner/owner.entity';
import { Visit } from 'src/visit/visit.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Pet implements PetInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
    default: null,
  })
  chipId: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  tatooId: string | null;

  @Column()
  type: string;

  @Column({
    nullable: true,
    default: null,
  })
  race: string | null;

  @Column({
    nullable: true,
    default: null,
    type: 'int',
  })
  age: number | null;

  @Column({
    type: 'enum',
    enum: PetSexes,
  })
  sex: PetSexes;

  @Column({
    nullable: true,
    default: null,
    type: 'float',
    precision: 5,
    scale: 2,
  })
  weight: number | null;

  @Column({
    nullable: true,
    default: null,
    type: 'float',
    precision: 5,
    scale: 2,
  })
  height: number | null;

  @Column({
    nullable: true,
    default: null,
    type: 'float',
    precision: 5,
    scale: 2,
  })
  length: number | null;

  @Column({
    nullable: true,
    default: null,
    type: 'longtext',
  })
  diseases: string | null;

  @Column({
    nullable: true,
    default: null,
    type: 'longtext',
  })
  others: string | null;

  @ManyToOne(() => Owner, (entity) => entity.pets)
  owner: Owner;

  @OneToMany(() => Visit, (entity) => entity.petOnVisit)
  visits: Visit[];
}
