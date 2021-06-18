import { OwnerInterface } from 'src/interfaces/owner';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
