import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskAssignmentRepository } from '../repositories/task-assignment.repository';
import { CreateTaskAssignmentDto } from '../domain/dtos/create-task-assignment.dto';
import { UpdateTaskAssignmentDto } from '../domain/dtos/update-task-assignment.dto';
import { TaskAssignment } from '../domain/entities/task-assignment.entity';

@Injectable()
export class TaskAssignmentService {
  constructor(private readonly taskAssignmentRepository: TaskAssignmentRepository) {}

  async create(createTaskAssignmentDto: CreateTaskAssignmentDto): Promise<TaskAssignment> {
    return await this.taskAssignmentRepository.create(createTaskAssignmentDto);
  }

  async findAll(): Promise<TaskAssignment[]> {
    return await this.taskAssignmentRepository.findAll();
  }

  async findById(id: number): Promise<TaskAssignment> {
    const taskAssignment = await this.taskAssignmentRepository.findById(id);
    if (!taskAssignment) {
      throw new NotFoundException(`Task assignment with ID ${id} not found`);
    }
    return taskAssignment;
  }

  async findByTaskId(taskId: number): Promise<TaskAssignment[]> {
    return await this.taskAssignmentRepository.findByTaskId(taskId);
  }

  async findByWorkerId(workerId: number): Promise<TaskAssignment[]> {
    return await this.taskAssignmentRepository.findByWorkerId(workerId);
  }

  async update(id: number, updateTaskAssignmentDto: UpdateTaskAssignmentDto): Promise<TaskAssignment> {
    // Check if task assignment exists
    const existingTaskAssignment = await this.taskAssignmentRepository.findById(id);
    if (!existingTaskAssignment) {
      throw new NotFoundException(`Task assignment with ID ${id} not found`);
    }

    const updatedTaskAssignment = await this.taskAssignmentRepository.update(id, updateTaskAssignmentDto);
    if (!updatedTaskAssignment) {
      throw new NotFoundException(`Task assignment with ID ${id} not found`);
    }
    return updatedTaskAssignment;
  }

  async delete(id: number): Promise<void> {
    const deleted = await this.taskAssignmentRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Task assignment with ID ${id} not found`);
    }
  }
} 