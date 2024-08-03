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
import { BoardLike } from './Board_like';
import { Chat } from './Chat'; // Chat 엔티티가 정의된 파일을 임포트

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

  @OneToMany(() => HealthRecords, (health) => health.user)
  health: HealthRecords[];

  @OneToMany(() => Chat, (chat) => chat.user)
  chats: Chat[];

  @OneToMany(() => HospitalRecord, (record) => record.user)
  hospitalRecords: HospitalRecord[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comment: Comment[];

  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];

  @OneToMany(() => BoardLike, (boardlike) => boardlike.user)
  likes: BoardLike[];
}
