import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany,} from 'typeorm';
import { Task } from './task.entity';
import { Person } from './person.entity';

@ObjectType()
@Entity()
export class Client extends Person {
  
  @OneToMany(() => Task, task => task.client, {
    nullable: true,
    eager: false,
    cascade: ['insert', 'update']
  })
  tasks: Task[];

}
