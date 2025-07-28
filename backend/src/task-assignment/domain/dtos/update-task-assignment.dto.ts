import { IsNumber, IsOptional, IsJSON } from 'class-validator';

export class UpdateTaskAssignmentDto {
  @IsNumber()
  @IsOptional()
  taskId?: number;

  @IsNumber()
  @IsOptional()
  workerId?: number;

  @IsNumber()
  @IsOptional()
  paymentDecided?: number;

  @IsNumber()
  @IsOptional()
  paymentMade?: number;

  @IsJSON()
  @IsOptional()
  metadata?: Record<string, any>;
} 