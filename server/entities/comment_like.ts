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
import { Comment } from './comment';

@Entity()
export class Comment_like {
  @PrimaryGeneratedColumn()
  like_id: number;

  @Column()
  comment_id: number;

  @ManyToOne(() => Comment, (comment) => comment.commentLike, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'comment_id', referencedColumnName: 'comment_id' })
  comment: Comment;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.comment, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
