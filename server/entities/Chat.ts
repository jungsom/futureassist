import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn,
  } from 'typeorm';
  import { User } from './User';
  
  @Entity()
  export class Chat {
    @PrimaryGeneratedColumn()
    chat_id: number;
  
    @ManyToOne(() => User, (user) => user.chats)
    @JoinColumn({ name: 'user_id' }) // 외래 키 컬럼의 이름을 명시적으로 지정
    user: User;
  
    @Column()
    disease: string;
  
    @Column()
    department: string;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;
  }