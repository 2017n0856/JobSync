import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Task } from './task.entity';
import { Worker } from './worker.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class TaskAssignment {
  @PrimaryColumn()
  task_id: number;

  @PrimaryColumn()
  worker_id: number;

  @ManyToOne(() => Task, (task) => task.assignments)
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @ManyToOne(() => Worker, (worker) => worker.tasks)
  @JoinColumn({ name: 'worker_id' })
  worker: Worker;

  @Field(() => Int)
  @Column({ default: 0 })
  budget_allocated: number;

  @Field(() => Int)
  @Column({ default: 0 })
  payment_made: number;
}
