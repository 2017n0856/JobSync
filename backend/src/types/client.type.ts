import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

 @InputType()
export class CreateClientInput {

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field()
  @IsNotEmpty()
  country: string;

  @Field()
  @IsNotEmpty()
  phoneNumber: string;

  @Field({ nullable: true })
  @IsOptional()
  instituteName?: string;

  @Field({ nullable: true })
  @IsOptional()
  metaData?: string;
};
