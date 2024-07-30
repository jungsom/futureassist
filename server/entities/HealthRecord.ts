import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { User } from './User';

@Entity()
export class HealthRecords {
  @PrimaryGeneratedColumn()
  health_id: number;

  @OneToMany((type) => User, (user) => user.user_id)
  user_id: User[];

  @Column({ nullable: true })
  weight: number;

  @Column({ nullable: true })
  bloodsugar: number;

  @Column({ nullable: true })
  bloodPressure: number;

  @Column({ nullable: true })
  cholesterol: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
