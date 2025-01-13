import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { NormalizeCountry, NormalizePhoneNumber } from 'src/common/transformers';
import { IsValidCountry } from 'src/common/decorators';
import { Task } from './task.entity';
import { Institute } from './institute.entity';

@ObjectType()
@Entity()
@Unique(["phoneNumber"])
export class Worker {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  @MaxLength(50, { message: 'Name must not exceed 50 characters' })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  @MaxLength(50, { message: 'Email must not exceed 50 characters' })
  @IsEmail({}, { message: 'Invalid email address.' })
  email: string;

  @Field()
  @Column()
  @NormalizeCountry()
  @IsNotEmpty({ message: 'Country is required.' })
  @IsString({message: 'Invalid country name.'})
  @IsValidCountry({ message: 'Invalid country' })
  country: string;

  @Field()
  @Column()
  @IsNotEmpty({ message: 'Phone number is required.' })
  @Matches(/^\+\d{1,3}\d{3,14}$/, { message: 'Country code is required.' })
  @NormalizePhoneNumber()
  @MinLength(12, { message: 'Invalid Phone Number' })
  @MaxLength(13, { message: 'Invalid Phone Number' })
  phoneNumber: string;

  @ManyToOne(() => Institute)
  @JoinColumn({ name: 'instituteId' })
  institute: Institute;

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

  @Field(type => String, { nullable: true })
  @Column('simple-json', { nullable: true })
  @IsOptional()
  metaData: any;
}
