import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: false,
    length: 255,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;
}
