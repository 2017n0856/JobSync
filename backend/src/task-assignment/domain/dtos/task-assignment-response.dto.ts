import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TaskAssignmentResponseDto {
  @ApiProperty({ description: 'Task assignment ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'ID of the assigned task', example: 1 })
  taskId: number;

  @ApiProperty({ description: 'ID of the assigned worker', example: 1 })
  workerId: number;

  @ApiPropertyOptional({ 
    description: 'Associated task details',
    example: { id: 1, name: 'Financial Report Analysis' }
  })
  task?: {
    id: number;
    name: string;
  };

  @ApiPropertyOptional({ 
    description: 'Associated worker details',
    example: { id: 1, name: 'Jane Smith' }
  })
  worker?: {
    id: number;
    name: string;
  };

  @ApiProperty({ description: 'Agreed payment amount for this assignment', example: 250.00 })
  paymentDecided: number;

  @ApiProperty({ description: 'Actual payment made for this assignment', example: 250.00 })
  paymentMade: number;

  @ApiPropertyOptional({ 
    description: 'Additional metadata as JSON', 
    example: { assignedDate: '2024-12-01', estimatedHours: 4, priority: 'Medium' }
  })
  metadata?: Record<string, any>;

  static example(): TaskAssignmentResponseDto {
    return {
      id: 1,
      taskId: 1,
      workerId: 1,
      task: {
        id: 1,
        name: 'Financial Report Analysis'
      },
      worker: {
        id: 1,
        name: 'Jane Smith'
      },
      paymentDecided: 250.00,
      paymentMade: 250.00,
      metadata: { assignedDate: '2024-12-01', estimatedHours: 4, priority: 'Medium' }
    };
  }
} 