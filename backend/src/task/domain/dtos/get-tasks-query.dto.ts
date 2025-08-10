import {
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  IsDateString,
  Min,
  Max,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TaskType } from '../../../common/enums/task-type.enum';

export class GetTaskQueryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsDateString()
  @IsOptional()
  deadlineDateFrom?: string;

  @IsDateString()
  @IsOptional()
  deadlineDateTo?: string;

  @IsString()
  @IsOptional()
  clientName?: string;

  @IsString()
  @IsOptional()
  workerName?: string;

  @IsIn(['assigned', 'not_assigned', 'delivered'])
  @IsOptional()
  taskStatus?: 'assigned' | 'not_assigned' | 'delivered';

  @IsIn(['yes', 'no'])
  @IsOptional()
  clientPaymentStatus?: 'yes' | 'no';

  @IsIn(['yes', 'no'])
  @IsOptional()
  workerPaymentStatus?: 'yes' | 'no';

  @IsEnum(TaskType)
  @IsOptional()
  taskType?: TaskType;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}
