import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsNumber, IsOptional, IsJSON } from 'class-validator';
import { Task } from '../../../task/domain/entities/task.entity';
import { Worker } from '../../../worker/domain/entities/worker.entity';

@Entity('task_assignments')
export class TaskAssignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  @IsNumber()
  taskId: number;

  @ManyToOne(() => Task)
  @JoinColumn({ name: 'taskId' })
  task: Task;

  @Column({ type: 'int' })
  @IsNumber()
  workerId: number;

  @ManyToOne(() => Worker)
  @JoinColumn({ name: 'workerId' })
  worker: Worker;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @IsNumber()
  paymentDecided: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @IsNumber()
  paymentMade: number;

  @Column({ type: 'json', nullable: true })
  @IsJSON()
  @IsOptional()
  metadata?: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 