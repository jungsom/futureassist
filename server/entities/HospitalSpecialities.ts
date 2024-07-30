import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Hospital } from './Hospital';

@Entity()
export class HospitalSpeciality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hospital_id: string;

  @ManyToOne(() => Hospital, (hospital) => hospital.specialities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'hospital_id', referencedColumnName: 'hospital_id' })
  hospital: Hospital;

  @Column()
  department: string;

  @Column('int')
  specialist_cnt: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
