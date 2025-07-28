import { IsNumber, IsOptional } from 'class-validator';

export class CreateTaskAssignmentDto {
  @IsNumber()
  taskId: number;

  @IsNumber()
  workerId: number;

  @IsNumber()
  @IsOptional()
  paymentDecided?: number;

  @IsNumber()
  @IsOptional()
  paymentMade?: number;
} 