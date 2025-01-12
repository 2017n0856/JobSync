import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, ValidateIf } from 'class-validator';

@ObjectType()
@Entity()
@Unique(["name"])
export class Client {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email address.' })
  email: string;

  @Field()
  @Column({
  transformer: {
    to(value: string): string {
      return value.replace(/\./g, '').replace(/\b\w/g, l => l.toUpperCase()).replace(/\B\w/g, l => l.toLowerCase());
    },
    from(value: string): string {
      return value;
    }
  }
  })
  @IsNotEmpty({ message: 'Country is required.' })
  @IsString({message: 'Invalid country name.'})
  country: string;

  @Field()
  @Column()
  @IsNotEmpty({ message: 'Phone number is required.' })
  @Matches(/^\+\d{1,3}\d{3,14}$/, { message: 'Country code is required.' })
  phoneNumber: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  @IsString({ message: 'Invalid institute name.' })
  instituteName: string;

  @Field(type => String, { nullable: true })
  @Column('simple-json', { nullable: true })
  @IsOptional()
  metaData: any;
}
