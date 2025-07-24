import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';

@InputType()
export class CreateTaskAssignmentInput {
  @Field(() => Int)
  @IsInt()
  task_id: number;

  @Field(() => Int)
  @IsInt()
  worker_id: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  budget_allocated?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  payment_made?: number;
}
