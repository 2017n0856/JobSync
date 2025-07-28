export class TaskAssignmentResponseDto {
  id: number;
  taskId: number;
  workerId: number;
  task?: {
    id: number;
    name: string;
  };
  worker?: {
    id: number;
    name: string;
  };
  paymentDecided: number;
  paymentMade: number;
} 