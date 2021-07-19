import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OwnerInterface } from '../interfaces/owner';
import { Pet } from '../pet/pet.entity';
import { Visit } from '../visit/visit.entity';

@Entity()
export class Owner implements OwnerInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    length: 64,
  })
  name: string;

  @Column({
    nullable: false,
    length: 64,
  })
  surname: string;

  @Column({
    unique: true,
    nullable: true,
    length: 16,
    default: null,
  })
  phone: string | null;

  @Column({
    unique: true,
    nullable: true,
    length: 255,
    default: null,
  })
  email: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  address: string | null;

  @OneToMany(() => Pet, (entity) => entity.owner)
  pets: Pet[];

  @OneToMany(() => Visit, (entity) => entity.ownerOnVisit)
  visits: Visit[];

  @Column()
  userId: string;
}
