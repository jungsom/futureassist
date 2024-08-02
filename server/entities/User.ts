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
import { Board } from './Board';
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

<<<<<<< HEAD
  @OneToMany(() => Comment, (comment) => comment.user_id)
=======
  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];

  @OneToMany(() => Comment, (comment) => comment.user)
>>>>>>> 7fec8a036dae9a2ec5e818c6ea88c648e47d525c
  comment: Comment[];
}
