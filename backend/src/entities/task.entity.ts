import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { Client } from './client.entity';
import { Institute } from './institute.entity';
import { Worker } from './worker.entity';

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
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @ManyToMany(() => Worker, worker => worker.tasks)
  workers: Worker[];

  @ManyToOne(() => Institute)
  @JoinColumn({ name: 'instituteId' })
  institute: Institute;
}
