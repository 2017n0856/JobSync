import { IsNumber, IsOptional, IsJSON } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskAssignmentDto {
  @ApiProperty({ 
    description: 'ID of the task to assign', 
    example: 1
  })
  @IsNumber()
  taskId: number;

  @ApiProperty({ 
    description: 'ID of the worker to assign the task to', 
    example: 1
  })
  @IsNumber()
  workerId: number;

  @ApiPropertyOptional({ 
    description: 'Agreed payment amount for this assignment', 
    example: 250.00
  })
  @IsNumber()
  @IsOptional()
  paymentDecided?: number;

  @ApiPropertyOptional({ 
    description: 'Actual payment made for this assignment', 
    example: 250.00
  })
  @IsNumber()
  @IsOptional()
  paymentMade?: number;

  @ApiPropertyOptional({ 
    description: 'Additional metadata as JSON', 
    example: { assignedDate: '2024-12-01', estimatedHours: 4, priority: 'Medium' }
  })
  @IsJSON()
  @IsOptional()
  metadata?: Record<string, any>;
} 