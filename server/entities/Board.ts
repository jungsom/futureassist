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
import { BoardLike } from './Board_like';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  board_id: number;

  @Column()
  user_id: number;

  @Column()
  user_name: string;

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

  @OneToMany(() => Comment, (comment) => comment.board)
  comments: Comment[];

  @OneToMany(() => BoardLike, (boardlike) => boardlike.board)
  like: BoardLike[];
}
