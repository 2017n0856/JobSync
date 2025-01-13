import { ObjectType } from '@nestjs/graphql';
import { Entity, Unique, OneToMany,} from 'typeorm';
import { Task } from './task.entity';
import { Person } from './person.entity';

@ObjectType()
@Entity()
@Unique(["phoneNumber"])
export class Client extends Person {

  @OneToMany(() => Task, task => task.client)
  tasks: Task[];

}
