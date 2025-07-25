import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskAssignment } from 'src/entities/taskAssignment.entity';
import { CreateTaskAssignmentInput } from 'src/types/taskAssignment.type';

@Injectable()
export class TaskAssignmentService {
  constructor(
    @InjectRepository(TaskAssignment)
    private taskAssignmentRepository: Repository<TaskAssignment>,
  ) {}

  async findAll(): Promise<TaskAssignment[]> {
    return await this.taskAssignmentRepository.find({
      relations: ['task', 'worker'],
    });
  }

  async findById(taskId: number, workerId: number): Promise<TaskAssignment | null> {
    return await this.taskAssignmentRepository.findOne({
      where: { task_id: taskId, worker_id: workerId },
      relations: ['task', 'worker'],
    });
  }

  async addTaskAssignment(
    createTaskAssignmentData: CreateTaskAssignmentInput,
  ): Promise<TaskAssignment> {
    const taskAssignment = this.taskAssignmentRepository.create(createTaskAssignmentData);
    return await this.taskAssignmentRepository.save(taskAssignment);
  }

  async updateTaskAssignment(
    taskId: number,
    workerId: number,
    updateTaskAssignmentData: CreateTaskAssignmentInput,
  ): Promise<TaskAssignment> {
    const taskAssignment = await this.taskAssignmentRepository.findOne({
      where: { task_id: taskId, worker_id: workerId },
    });
    if (!taskAssignment) {
      throw new NotFoundException(`TaskAssignment with task_id ${taskId} and worker_id ${workerId} not found`);
    }

    await this.taskAssignmentRepository.update(
      { task_id: taskId, worker_id: workerId },
      updateTaskAssignmentData,
    );
    return await this.taskAssignmentRepository.findOne({
      where: { task_id: taskId, worker_id: workerId },
      relations: ['task', 'worker'],
    });
  }

  async deleteTaskAssignment(taskId: number, workerId: number): Promise<boolean> {
    const taskAssignment = await this.taskAssignmentRepository.findOne({
      where: { task_id: taskId, worker_id: workerId },
    });
    if (!taskAssignment) {
      throw new NotFoundException(`TaskAssignment with task_id ${taskId} and worker_id ${workerId} not found`);
    }

    await this.taskAssignmentRepository.remove(taskAssignment);
    return true;
  }
}
