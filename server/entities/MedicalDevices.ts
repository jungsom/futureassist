import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { Hospital } from './Hospital';

@Entity()
export class MedicalDevice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hospital_id: string;

  @ManyToOne(() => Hospital, (hospital) => hospital.medicalDevices, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'hospital_id', referencedColumnName: 'hospital_id' })
  hospital: Hospital;

  @Column()
  device_name: string;

  @Column()
  device_cnt: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
