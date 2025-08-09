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

    if (filters?.name) {
      queryBuilder.andWhere('LOWER(task.name) LIKE LOWER(:name)', {
        name: `%${filters.name}%`,
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

    if (filters?.clientName) {
      queryBuilder.andWhere('LOWER(client.name) LIKE LOWER(:clientName)', {
        clientName: `%${filters.clientName}%`,
      });
    }

    if (filters?.workerName) {
      queryBuilder.andWhere('LOWER(worker.name) LIKE LOWER(:workerName)', {
        workerName: `%${filters.workerName}%`,
      });
    }

    if (filters?.taskStatus) {
      if (filters.taskStatus === 'assigned') {
        queryBuilder.andWhere('task.workerId IS NOT NULL AND task.submittedOnDate IS NULL');
      } else if (filters.taskStatus === 'not_assigned') {
        queryBuilder.andWhere('task.workerId IS NULL');
      } else if (filters.taskStatus === 'delivered') {
        queryBuilder.andWhere('task.submittedOnDate IS NOT NULL');
      }
    }

    if (filters?.clientPaymentStatus) {
      if (filters.clientPaymentStatus === 'yes') {
        queryBuilder.andWhere('COALESCE(task.clientPaymentMade, 0) = COALESCE(task.clientPaymentDecided, 0)');
      } else if (filters.clientPaymentStatus === 'no') {
        queryBuilder.andWhere('COALESCE(task.clientPaymentMade, 0) <> COALESCE(task.clientPaymentDecided, 0)');
      }
    }

    if (filters?.workerPaymentStatus) {
      if (filters.workerPaymentStatus === 'yes') {
        queryBuilder.andWhere('COALESCE(task.workerPaymentMade, 0) = COALESCE(task.workerPaymentDecided, 0)');
      } else if (filters.workerPaymentStatus === 'no') {
        queryBuilder.andWhere('COALESCE(task.workerPaymentMade, 0) <> COALESCE(task.workerPaymentDecided, 0)');
      }
    }

    if (filters?.taskType) {
      queryBuilder.andWhere('task.taskType = :taskType', {
        taskType: filters.taskType,
      });
    }

    const total = await queryBuilder.getCount();

    const page = filters?.page || 1;
    const limit = filters?.limit || 10;
    const offset = (page - 1) * limit;

    queryBuilder
      .orderBy('task.deadlineDate', 'DESC')
      .addOrderBy('task.deadlineTime', 'DESC')
      .skip(offset)
      .take(limit);

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
