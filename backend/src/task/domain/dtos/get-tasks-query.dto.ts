import { IsOptional, IsString, IsEnum, IsNumber, IsDateString } from 'class-validator';
import { TaskType } from '../../../common/enums/task-type.enum';

export class GetTaskQueryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsDateString()
  @IsOptional()
  deadlineDateFrom?: string;

  @IsDateString()
  @IsOptional()
  deadlineDateTo?: string;

  @IsNumber()
  @IsOptional()
  clientId?: number;

  @IsNumber()
  @IsOptional()
  workerId?: number;

  @IsEnum(TaskType)
  @IsOptional()
  taskType?: TaskType;
} 