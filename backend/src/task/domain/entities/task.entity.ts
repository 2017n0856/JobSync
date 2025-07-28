import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsOptional, IsString, IsEnum, IsNumber, IsDateString } from 'class-validator';
import { TaskType } from '../../../common/enums/task-type.enum';
import { Client } from '../../../client/domain/entities/client.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  name: string;

  @Column({ type: 'text', nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Column({ type: 'time', nullable: true })
  @IsDateString()
  @IsOptional()
  deadlineTime?: string;

  @Column({ type: 'date', nullable: true })
  @IsDateString()
  @IsOptional()
  deadlineDate?: string;

  @Column({ type: 'date', nullable: true })
  @IsDateString()
  @IsOptional()
  submittedOnDate?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @IsNumber()
  paymentDecided: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @IsNumber()
  paymentMade: number;

  @Column({ type: 'int' })
  @IsNumber()
  clientId: number;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @Column({ type: 'enum', enum: TaskType })
  @IsEnum(TaskType)
  taskType: TaskType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 