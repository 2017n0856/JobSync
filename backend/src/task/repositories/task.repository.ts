import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../domain/entities/task.entity';
import { GetTaskQueryDto } from '../domain/dtos/get-tasks-query.dto';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(taskData: Partial<Task>): Promise<Task> {
    const task = this.taskRepository.create(taskData);
    return await this.taskRepository.save(task);
  }

  async findById(id: number): Promise<Task | null> {
    return await this.taskRepository.findOne({ 
      where: { id },
      relations: ['client']
    });
  }

  async findAll(filters?: GetTaskQueryDto): Promise<Task[]> {
    const queryBuilder = this.taskRepository.createQueryBuilder('task')
      .leftJoinAndSelect('task.client', 'client');
    
    if (filters?.name) {
      queryBuilder.where('LOWER(task.name) LIKE LOWER(:name)', { 
        name: `%${filters.name}%` 
      });
    }
    
    if (filters?.status) {
      const whereClause = filters.name ? 'AND' : 'WHERE';
      queryBuilder.andWhere('LOWER(task.status) LIKE LOWER(:status)', { 
        status: `%${filters.status}%` 
      });
    }
    
    if (filters?.deadlineDateFrom) {
      const whereClause = filters.name || filters.status ? 'AND' : 'WHERE';
      queryBuilder.andWhere('task.deadlineDate >= :deadlineDateFrom', { 
        deadlineDateFrom: filters.deadlineDateFrom 
      });
    }
    
    if (filters?.deadlineDateTo) {
      const whereClause = filters.name || filters.status || filters.deadlineDateFrom ? 'AND' : 'WHERE';
      queryBuilder.andWhere('task.deadlineDate <= :deadlineDateTo', { 
        deadlineDateTo: filters.deadlineDateTo 
      });
    }
    
    if (filters?.clientId) {
      const whereClause = filters.name || filters.status || filters.deadlineDateFrom || filters.deadlineDateTo ? 'AND' : 'WHERE';
      queryBuilder.andWhere('task.clientId = :clientId', { clientId: filters.clientId });
    }
    
    if (filters?.taskType) {
      const whereClause = filters.name || filters.status || filters.deadlineDateFrom || filters.deadlineDateTo || filters.clientId ? 'AND' : 'WHERE';
      queryBuilder.andWhere('task.taskType = :taskType', { taskType: filters.taskType });
    }
    
    return await queryBuilder.orderBy('task.createdAt', 'DESC').getMany();
  }

  async update(id: number, updateData: Partial<Task>): Promise<Task | null> {
    await this.taskRepository.update(id, updateData);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.taskRepository.delete(id);
    return result.affected > 0;
  }
} 