import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne
} from 'typeorm';
import { User } from './User';

@Entity()
export class HealthRecords {
  @PrimaryGeneratedColumn()
  health_id: number;

  @ManyToOne(() => User, (user) => user.health)
  user: User;

  @Column({ nullable: true })
  weight: number;

  @Column({ nullable: true })
  bloodsugar: number;

  @Column({ nullable: true })
  bloodPressure: number;

  @Column({ nullable: true })
  cholesterol: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
