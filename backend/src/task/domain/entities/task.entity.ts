import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsOptional, IsString, IsEnum, IsNumber, IsDateString, IsJSON } from 'class-validator';
import { TaskType } from '../../../common/enums/task-type.enum';
import { Client } from '../../../client/domain/entities/client.entity';

@Entity('task')
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

  @Column({ name: 'deadline_time', type: 'time', nullable: true, default: '11:59:59' })
  @IsDateString()
  @IsOptional()
  deadlineTime?: string;

  @Column({ name: 'deadline_date', type: 'date', nullable: true })
  @IsDateString()
  @IsOptional()
  deadlineDate?: string;

  @Column({ name: 'submitted_on_date', type: 'date', nullable: true })
  @IsDateString()
  @IsOptional()
  submittedOnDate?: string;

  @Column({ name: 'payment_decided', type: 'decimal', precision: 10, scale: 2, default: 0 })
  @IsNumber()
  paymentDecided: number;

  @Column({ name: 'payment_made', type: 'decimal', precision: 10, scale: 2, default: 0 })
  @IsNumber()
  paymentMade: number;

  @Column({ name: 'client_id', type: 'int', nullable: true })
  @IsNumber()
  @IsOptional()
  clientId?: number;

  @ManyToOne(() => Client, { nullable: true })
  @JoinColumn({ name: 'client_id' })
  @IsOptional()
  client?: Client;

  @Column({ name: 'task_type', type: 'enum', enum: TaskType, default: TaskType.ASSIGNMENT })
  @IsEnum(TaskType)
  taskType: TaskType;

  @Column({ type: 'json', nullable: true })
  @IsJSON()
  @IsOptional()
  metadata?: Record<string, any>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
} 