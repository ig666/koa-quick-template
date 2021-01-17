import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number; // ts严格模式下添加非空断言 "!"

  @Column({ length: 3 })
  username!: string;

  @Column()
  password!: string;

  @Column()
  nickname!: string;

  @CreateDateColumn()
  createTime!: Date;

  @UpdateDateColumn()
  updateTime!: Date;
}
