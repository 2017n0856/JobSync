import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { NormalizeCountry } from 'src/common/transformers';
import { IsValidCountry } from 'src/common/decorators';

@ObjectType()
@Entity()
@Unique(['name'])
export class Institute {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  @NormalizeCountry()
  @IsString({ message: 'Invalid country name.' })
  @IsValidCountry({ message: 'Invalid country' })
  country: string;
}
