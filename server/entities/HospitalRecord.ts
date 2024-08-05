import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { User } from './User';
import { Hospital } from './Hospital';
import { MedicalDevice } from './MedicalDevices';
import { HospitalSpeciality } from './HospitalSpecialities';

@Entity()
export class HospitalRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.hospitalRecords, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: User;

  @Column()
  hospital_id: string;

  @ManyToOne(() => Hospital, (hospital) => hospital.hospitalRecords)
  @JoinColumn({ name: 'hospital_id', referencedColumnName: 'hospital_id' })
  hospital: Hospital;

  @Column('jsonb', { nullable: true })
  medical_devices: MedicalDevice[];

  @Column('jsonb', { nullable: true })
  specialities: HospitalSpeciality[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
