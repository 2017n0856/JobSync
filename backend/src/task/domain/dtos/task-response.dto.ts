import { TaskType } from '../../../common/enums/task-type.enum';

export class TaskResponseDto {
  id: number;
  name: string;
  description?: string;
  deadlineTime?: string;
  deadlineDate?: string;
  submittedOnDate?: string;
  paymentDecided: number;
  paymentMade: number;
  clientId: number;
  client?: {
    id: number;
    name: string;
  };
  taskType: TaskType;
  metadata?: Record<string, any>;
} 