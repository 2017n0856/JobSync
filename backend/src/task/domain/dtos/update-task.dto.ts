import { IsOptional, IsString, IsEnum, IsNumber, IsDateString } from 'class-validator';
import { TaskType } from '../../../common/enums/task-type.enum';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  name?: string;

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
  @IsOptional()
  clientId?: number;

  @IsEnum(TaskType)
  @IsOptional()
  taskType?: TaskType;
} 