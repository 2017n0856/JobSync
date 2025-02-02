import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, ManyToOne, Unique, BeforeInsert, BeforeUpdate } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Institute } from './institute.entity';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { NormalizeCountry, NormalizePhoneNumber } from 'src/common/transformers';
import { IsValidCountry } from 'src/common/decorators';
import { getCurrencyFromCountry } from 'src/common/utils';

@ObjectType()
@Entity()
@Unique(["phone_number"])
export class Person {
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
  phone_number: string;

  @IsOptional()
  @ManyToOne(() => Institute)
  @JoinColumn({ name: 'institute_id' })
  institute: Institute;

  @Field()
  @Column({ nullable: true })
  currency: string;

  @BeforeInsert()
  @BeforeUpdate()
  assignCurrencyBasedOnCountry() {
    this.currency = getCurrencyFromCountry(this.country);
  }
}