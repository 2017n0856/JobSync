import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { Client } from './client.entity';
import { Institute } from './institute.entity';
import { TaskStatus, TaskType } from 'src/shared/constants';
import { TaskAssignment } from './taskAssignment.entity';


registerEnumType(TaskStatus, {
    name: 'TaskStatus',
    description: 'The status of the task'
});

registerEnumType(TaskType, {
    name: 'TaskType',
    description: 'The type of the task'
});
@ObjectType()
@Entity()
export class Task {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name: string;

  @Field()
  @Column()
  @IsOptional()
  @MaxLength(300, { message: 'Description limit exceed' })
  description: string;

  @ManyToOne(() => Client, client => client.tasks)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Field(() => Int)
  @Column({ default: 0})
  budget_allocated: number;

  @Field(() => Int)
  @Column({ default: 0})
  payment_received: number;

  @Field(() => Date)
  @Column({ type: 'date' })
  deadline: Date;

  @Field(() => Date)
  @Column({ type: 'date', nullable: true })
  submitted: Date;

  @Field(() => TaskStatus)
  @Column({
      type: 'enum',
      enum: TaskStatus,
      default: TaskStatus.Unassigned
  })
  status: TaskStatus;

  @Field(() => TaskType)
  @Column({
      type: 'enum',
      enum: TaskType,
      default: TaskType.Assignment
  })
  type: TaskType;

  @Field()
  @IsOptional()
  @ManyToOne(() => Institute)
  @JoinColumn({ name: 'institute_id' })
  institute: Institute;

  @Field(() => [TaskAssignment])
  @OneToMany(() => TaskAssignment, taskAssignment => taskAssignment.task)
  assignments: TaskAssignment[];
}
