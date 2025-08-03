import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from '../repositories/task.repository';
import { CreateTaskDto } from '../domain/dtos/create-task.dto';
import { UpdateTaskDto } from '../domain/dtos/update-task.dto';
import { GetTaskQueryDto } from '../domain/dtos/get-tasks-query.dto';
import { Task } from '../domain/entities/task.entity';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.create(createTaskDto);
  }

  async findAll(
    filters?: GetTaskQueryDto,
  ): Promise<{ tasks: Task[]; total: number; page: number; limit: number }> {
    return await this.taskRepository.findAll(filters);
  }

  async findById(id: number): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    // Check if task exists
    const existingTask = await this.taskRepository.findById(id);
    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const updatedTask = await this.taskRepository.update(id, updateTaskDto);
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return updatedTask;
  }

  async delete(id: number): Promise<void> {
    const deleted = await this.taskRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
