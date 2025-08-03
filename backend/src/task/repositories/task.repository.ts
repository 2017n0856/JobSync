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
      relations: ['client', 'worker'],
    });
  }

  async findAll(
    filters?: GetTaskQueryDto,
  ): Promise<{ tasks: Task[]; total: number; page: number; limit: number }> {
    const queryBuilder = this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.client', 'client')
      .leftJoinAndSelect('task.worker', 'worker');

    // Apply filters
    if (filters?.name) {
      queryBuilder.andWhere('LOWER(task.name) LIKE LOWER(:name)', {
        name: `%${filters.name}%`,
      });
    }

    if (filters?.status) {
      queryBuilder.andWhere('LOWER(task.status) LIKE LOWER(:status)', {
        status: `%${filters.status}%`,
      });
    }

    if (filters?.deadlineDateFrom) {
      queryBuilder.andWhere('task.deadlineDate >= :deadlineDateFrom', {
        deadlineDateFrom: filters.deadlineDateFrom,
      });
    }

    if (filters?.deadlineDateTo) {
      queryBuilder.andWhere('task.deadlineDate <= :deadlineDateTo', {
        deadlineDateTo: filters.deadlineDateTo,
      });
    }

    if (filters?.clientId) {
      queryBuilder.andWhere('task.clientId = :clientId', {
        clientId: filters.clientId,
      });
    }

    if (filters?.workerId) {
      queryBuilder.andWhere('task.workerId = :workerId', {
        workerId: filters.workerId,
      });
    }

    if (filters?.taskType) {
      queryBuilder.andWhere('task.taskType = :taskType', {
        taskType: filters.taskType,
      });
    }

    // Get total count for pagination
    const total = await queryBuilder.getCount();

    // Apply pagination
    const page = filters?.page || 1;
    const limit = filters?.limit || 10;
    const offset = (page - 1) * limit;

    queryBuilder.orderBy('task.createdAt', 'DESC').skip(offset).take(limit);

    const tasks = await queryBuilder.getMany();

    return {
      tasks,
      total,
      page,
      limit,
    };
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
