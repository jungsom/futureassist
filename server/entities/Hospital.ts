import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { MedicalDevice } from './MedicalDevices';
import { HospitalSpeciality } from './HospitalSpecialities';

@Entity()
export class Hospital {
  @PrimaryColumn()
  hospital_id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  telno: string;

  @Column({ nullable: true })
  hospUrl: string;

  @Column()
  addr: string;

  @Column()
  sido_addr: string;

  @Column()
  sigu_addr: string;

  @Column({ nullable: true })
  dong_addr: string;

  @Column('float', { nullable: true })
  xPos: number;

  @Column('float', { nullable: true })
  yPos: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => MedicalDevice, (device) => device.hospital)
  medicalDevices: MedicalDevice[];

  @OneToMany(() => HospitalSpeciality, (speciality) => speciality.hospital)
  specialities: HospitalSpeciality[];
}
