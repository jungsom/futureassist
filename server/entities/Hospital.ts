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
import { HospitalRecord } from './HospitalRecord';

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
  url: string;

  @Column()
  addr: string;

  @Column()
  sido_addr: string;

  @Column()
  sigu_addr: string;

  @Column({ nullable: true })
  dong_addr: string;

  @Column('float', { nullable: true })
  x_pos: number;

  @Column('float', { nullable: true })
  y_pos: number;

  @Column('geography', {
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true
  })
  geom: string;

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

  @OneToMany(() => HospitalRecord, (record) => record.hospital)
  hospitalRecords: HospitalRecord[];
}
