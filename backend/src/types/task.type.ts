
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, IsOptional, Min, IsDateString } from 'class-validator';
import { TaskStatus, TaskType } from 'src/shared/constants';

@InputType()
export class CreateTaskInput {
  @Field()
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters.' })
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(300, { message: 'Description must not exceed 300 characters.' })
  description?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Min(0, { message: 'Budget allocated must be a positive number.' })
  budget_allocated?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Min(0, { message: 'Payment received must be a positive number.' })
  payment_received?: number;

  @Field()
  @IsOptional()
  @IsDateString({}, { message: 'Deadline must be a valid date.' })
  deadline?: Date;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  institute_id?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  client_id?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  status?: TaskStatus;

  @Field(() => String, { nullable: true })
  @IsOptional()
  type?: TaskType;
}