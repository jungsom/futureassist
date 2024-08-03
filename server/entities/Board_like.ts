import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn
} from 'typeorm';
import { Board } from './Board';
import { User } from './User';

@Entity()
export class BoardLike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  board_id: number;

  @ManyToOne(() => Board, (board) => board.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'board_id', referencedColumnName: 'board_id' })
  board: Board;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
