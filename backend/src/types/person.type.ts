import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreatePersonInput {
  @Field()
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  @MaxLength(50, { message: 'Name must not exceed 50 characters' })
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(50, { message: 'Email must not exceed 50 characters' })
  @IsEmail({}, { message: 'Invalid email address.' })
  email?: string;

  @Field()
  @IsNotEmpty({ message: 'Country is required.' })
  @Matches(/^[A-Za-z\s]+$/, { message: 'Invalid country name.' })
  country: string;

  @Field()
  @IsNotEmpty({ message: 'Phone number is required.' })
  @Matches(/^\+\d{1,3}\d{3,14}$/, { message: 'Country code is required.' })
  @MinLength(12, { message: 'Invalid Phone Number' })
  @MaxLength(13, { message: 'Invalid Phone Number' })
  phone_number: string;
}
