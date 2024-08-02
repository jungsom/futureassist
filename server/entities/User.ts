import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany
} from 'typeorm';
import { HealthRecords } from './HealthRecord';
import { HospitalRecord } from './HospitalRecord';
import { Comment } from './comment';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  birth_year: number;

  @Column({ nullable: true })
  profile_image?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @OneToMany(() => HealthRecords, (health) => health.user_id)
  health: HealthRecords[];

  @OneToMany(() => HospitalRecord, (record) => record.user)
  hospitalRecords: HospitalRecord[];

  @OneToMany(() => Comment, (comment) => comment.user_id)
  comment: Comment[];
}
