import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany
} from 'typeorm';
import { User } from './User';
import { Comment } from './comment';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  board_id: number;

  @OneToMany(() => Comment, (comment) => comment.board_id)
  comment_id: Comment[];

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.boards)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: User;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column('simple-array')
  hashtag: string[];

  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  likes: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
