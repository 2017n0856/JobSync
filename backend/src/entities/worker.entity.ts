import { ObjectType } from '@nestjs/graphql';
import { Entity, ManyToMany, JoinTable } from 'typeorm';
import { Task } from './task.entity';
import { Person } from './person.entity';

@ObjectType()
@Entity()
export class Worker extends Person{

  @ManyToMany(() => Task, task => task.workers)
  @JoinTable({
    name: 'workers_tasks',
    joinColumn: {
        name: 'workerId',
        referencedColumnName: 'id'
    },
    inverseJoinColumn: {
        name: 'taskId',
        referencedColumnName: 'id'
    }
  })
  tasks: Task[];

}
