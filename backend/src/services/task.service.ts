import { Injectable, NotFoundException } from '@nestjs/common';
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
    return await this.taskRepository.find({
      relations: ['client', 'institute', 'assignments'],
    });
  }

  async findById(id: number): Promise<Task | null> {
    return await this.taskRepository.findOne({
      where: { id },
      relations: ['client', 'institute', 'assignments'],
    });
  }

  async findByName(name: string): Promise<Task | null> {
    return await this.taskRepository.findOne({
      where: { name },
      relations: ['client', 'institute', 'assignments'],
    });
  }

  async addTask(createTaskData: CreateTaskInput): Promise<Task> {
    const task = this.taskRepository.create(createTaskData);
    return await this.taskRepository.save(task);
  }

  async updateTask(id: number, updateTaskData: CreateTaskInput): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    await this.taskRepository.update(id, updateTaskData);
    return await this.taskRepository.findOne({
      where: { id },
      relations: ['client', 'institute', 'assignments'],
    });
  }

  async deleteTask(id: number): Promise<boolean> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    await this.taskRepository.remove(task);
    return true;
  }
}
