import { IsOptional, IsString, IsEnum, IsNumber, IsDateString, IsJSON, MinLength, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskType } from '../../../common/enums/task-type.enum';

export class UpdateTaskDto {
  @ApiPropertyOptional({ 
    description: 'Task name', 
    example: 'Financial Report Analysis',
    minLength: 2,
    maxLength: 255
  })
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(255)
  name?: string;

  @ApiPropertyOptional({ 
    description: 'Detailed task description', 
    example: 'Analyze quarterly financial reports and provide insights on revenue trends'
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ 
    description: 'Task deadline time (HH:MM:SS format)', 
    example: '17:00:00'
  })
  @IsDateString()
  @IsOptional()
  deadlineTime?: string;

  @ApiPropertyOptional({ 
    description: 'Task deadline date (YYYY-MM-DD format)', 
    example: '2024-12-31'
  })
  @IsDateString()
  @IsOptional()
  deadlineDate?: string;

  @ApiPropertyOptional({ 
    description: 'Date when task was submitted (YYYY-MM-DD format)', 
    example: '2024-12-25'
  })
  @IsDateString()
  @IsOptional()
  submittedOnDate?: string;

  @ApiPropertyOptional({ 
    description: 'Agreed payment amount', 
    example: 500.00
  })
  @IsNumber()
  @IsOptional()
  paymentDecided?: number;

  @ApiPropertyOptional({ 
    description: 'Actual payment made', 
    example: 500.00
  })
  @IsNumber()
  @IsOptional()
  paymentMade?: number;

  @ApiPropertyOptional({ 
    description: 'ID of the client this task belongs to', 
    example: 1
  })
  @IsNumber()
  @IsOptional()
  clientId?: number;

  @ApiPropertyOptional({ 
    description: 'Type of task', 
    enum: TaskType,
    example: TaskType.ASSIGNMENT
  })
  @IsEnum(TaskType)
  @IsOptional()
  taskType?: TaskType;

  @ApiPropertyOptional({ 
    description: 'Additional metadata as JSON', 
    example: { priority: 'High', complexity: 'Medium', estimatedHours: 8 }
  })
  @IsJSON()
  @IsOptional()
  metadata?: Record<string, any>;
} 