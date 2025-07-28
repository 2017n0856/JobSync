import { IsOptional, IsString, IsEnum, IsNumber, IsDateString, IsJSON } from 'class-validator';
import { TaskType } from '../../../common/enums/task-type.enum';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  deadlineTime?: string;

  @IsDateString()
  @IsOptional()
  deadlineDate?: string;

  @IsDateString()
  @IsOptional()
  submittedOnDate?: string;

  @IsNumber()
  @IsOptional()
  paymentDecided?: number;

  @IsNumber()
  @IsOptional()
  paymentMade?: number;

  @IsNumber()
  clientId: number;

  @IsEnum(TaskType)
  taskType: TaskType;

  @IsJSON()
  @IsOptional()
  metadata?: Record<string, any>;
} 