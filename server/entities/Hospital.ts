import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Hospital {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hospital_id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  telno: string;

  @Column()
  hospUrl: string;

  @Column()
  addr: string;

  @Column()
  sido_addr: string;

  @Column()
  sigu_addr: string;

  @Column()
  dong_addr: string;

  @Column()
  xPos: number;

  @Column()
  yPos: number;
}
