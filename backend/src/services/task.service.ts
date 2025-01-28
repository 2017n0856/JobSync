import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from 'src/entities/task.entity';
import { CreateTaskInput } from 'src/types/task.type';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find(); 
  }

  async addTask(createTaskData: CreateTaskInput): Promise<Task> {
    const task = this.taskRepository.create(createTaskData);
    return await this.taskRepository.save(task);
  }
}