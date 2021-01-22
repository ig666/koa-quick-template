import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

enum Gender {
  man = 1, // 男
  woman = 2 // 女
}
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string; // ts严格模式下添加非空断言 "!"

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column({ default: null })
  nickname!: string;

  @Column({ type: 'enum', enum: Gender, default: Gender.man })
  gender!: Gender;

  @CreateDateColumn()
  createTime!: Date;

  @UpdateDateColumn()
  updateTime!: Date;
}
