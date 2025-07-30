import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsNumber, IsOptional, IsJSON } from 'class-validator';
import { Task } from '../../../task/domain/entities/task.entity';
import { Worker } from '../../../worker/domain/entities/worker.entity';

@Entity('task_assignment')
export class TaskAssignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'task_id', type: 'int' })
  @IsNumber()
  taskId: number;

  @ManyToOne(() => Task)
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @Column({ name: 'worker_id', type: 'int' })
  @IsNumber()
  workerId: number;

  @ManyToOne(() => Worker)
  @JoinColumn({ name: 'worker_id' })
  worker: Worker;

  @Column({ name: 'payment_decided', type: 'decimal', precision: 10, scale: 2, default: 0 })
  @IsNumber()
  paymentDecided: number;

  @Column({ name: 'payment_made', type: 'decimal', precision: 10, scale: 2, default: 0 })
  @IsNumber()
  paymentMade: number;

  @Column({ type: 'json', nullable: true })
  @IsJSON()
  @IsOptional()
  metadata?: Record<string, any>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
} 