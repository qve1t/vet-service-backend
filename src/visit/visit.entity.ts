import { VisitInterface } from 'src/interfaces/visit';
import { Owner } from 'src/owner/owner.entity';
import { Pet } from 'src/pet/pet.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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
  description: string;

  @ManyToOne(() => Pet, (entity) => entity.visits)
  petOnVisit: Pet;

  @ManyToOne(() => Owner, (entity) => entity.visits)
  ownerOnVisit: Owner;
}
