import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { User } from './User';

@Entity()
export class HealthRecords {
  @PrimaryGeneratedColumn()
  health_id: number;

  @ManyToOne(() => User, (user) => user.health, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user_id: number;

  @Column({ nullable: true })
  weight: number;

  @Column({ nullable: true })
  height: number;

  @Column({ nullable: true })
  bloodsugar: number;

  @Column({ nullable: true })
  bloodpressure: number;

  @Column({ nullable: true })
  cholesterol: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
