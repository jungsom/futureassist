import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany
} from 'typeorm';
import { User } from './User';
import { Comment_like } from './comment_like';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  comment_id: number;

  // @ManyToOne(() => Board, (board) => board.comment, {
  //   onDelete: 'CASCADE'
  // })
  // @JoinColumn({ name: 'board_id', referencedColumnName: 'board_id' })
  // board: Board;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.comment, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: User;

  @ManyToMany(() => Comment_like, (comment_like) => comment_like.comment, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'commentLike', referencedColumnName: 'commentLike' })
  commentLike: Comment_like;

  @Column()
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
