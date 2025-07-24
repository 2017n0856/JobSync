import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Person } from './person.entity';
import { TaskAssignment } from './taskAssignment.entity';

@ObjectType()
@Entity()
export class Worker extends Person {
  @Field(() => [TaskAssignment], { nullable: true })
  @OneToMany(() => TaskAssignment, (taskAssignment) => taskAssignment.worker)
  tasks: TaskAssignment[];
}
