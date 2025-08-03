import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsOptional, IsJSON } from 'class-validator';
import { Role } from '../enums/role.enum';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;

  @Column({ name: 'phone_number', type: 'varchar', length: 20, nullable: true })
  phoneNumber?: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: Role.VIEWER,
    nullable: false,
  })
  role: Role;

  @Column({ type: 'json', nullable: true })
  @IsJSON()
  @IsOptional()
  metadata?: Record<string, any>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
