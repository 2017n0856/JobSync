import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskType } from '../../../common/enums/task-type.enum';

export class TaskResponseDto {
  @ApiProperty({ description: 'Task ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Task name', example: 'Financial Report Analysis' })
  name: string;

  @ApiPropertyOptional({ description: 'Detailed task description', example: 'Analyze quarterly financial reports and provide insights on revenue trends' })
  description?: string;

  @ApiPropertyOptional({ description: 'Task deadline time (HH:MM:SS format)', example: '17:00:00' })
  deadlineTime?: string;

  @ApiPropertyOptional({ description: 'Task deadline date (YYYY-MM-DD format)', example: '2024-12-31' })
  deadlineDate?: string;

  @ApiPropertyOptional({ description: 'Date when task was submitted (YYYY-MM-DD format)', example: '2024-12-25' })
  submittedOnDate?: string;

  @ApiProperty({ description: 'Agreed payment amount from client', example: 500.00 })
  clientPaymentDecided: number;

  @ApiProperty({ description: 'Actual payment made by client', example: 500.00 })
  clientPaymentMade: number;

  @ApiProperty({ description: 'Agreed payment amount to worker', example: 400.00 })
  workerPaymentDecided: number;

  @ApiProperty({ description: 'Actual payment made to worker', example: 400.00 })
  workerPaymentMade: number;

  @ApiPropertyOptional({ description: 'ID of the client this task belongs to', example: 1 })
  clientId?: number;

  @ApiPropertyOptional({ 
    description: 'Associated client details',
    example: { id: 1, name: 'Acme Corporation' }
  })
  client?: {
    id: number;
    name: string;
  };

  @ApiPropertyOptional({ description: 'ID of the worker assigned to this task', example: 1 })
  workerId?: number;

  @ApiPropertyOptional({ 
    description: 'Associated worker details',
    example: { id: 1, name: 'John Doe' }
  })
  worker?: {
    id: number;
    name: string;
  };

  @ApiProperty({ description: 'Type of task', enum: TaskType, example: TaskType.ASSIGNMENT })
  taskType: TaskType;

  @ApiPropertyOptional({ 
    description: 'Additional metadata as JSON', 
    example: { priority: 'High', complexity: 'Medium', estimatedHours: 8 }
  })
  metadata?: Record<string, any>;

  static example(): TaskResponseDto {
    return {
      id: 1,
      name: 'Financial Report Analysis',
      description: 'Analyze quarterly financial reports and provide insights on revenue trends',
      deadlineTime: '17:00:00',
      deadlineDate: '2024-12-31',
      submittedOnDate: '2024-12-25',
      clientPaymentDecided: 500.00,
      clientPaymentMade: 500.00,
      workerPaymentDecided: 400.00,
      workerPaymentMade: 400.00,
      clientId: 1,
      client: {
        id: 1,
        name: 'Acme Corporation'
      },
      workerId: 1,
      worker: {
        id: 1,
        name: 'John Doe'
      },
      taskType: TaskType.ASSIGNMENT,
      metadata: { priority: 'High', complexity: 'Medium', estimatedHours: 8 }
    };
  }
} 