import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetWorkerQueryDto } from '../domain/dtos/get-workers-query.dto';
import { Worker } from '../domain/entities/worker.entity';

@Injectable()
export class WorkerRepository {
  constructor(
    @InjectRepository(Worker)
    private readonly workerRepository: Repository<Worker>,
  ) {}

  async create(workerData: Partial<Worker>): Promise<Worker> {
    const worker = this.workerRepository.create(workerData);
    return await this.workerRepository.save(worker);
  }

  async findById(id: number): Promise<Worker | null> {
    return await this.workerRepository.findOne({
      where: { id },
      relations: ['institute'],
    });
  }

  async findByName(name: string): Promise<Worker | null> {
    return await this.workerRepository.findOne({ where: { name } });
  }

  async findAll(
    filters?: GetWorkerQueryDto,
  ): Promise<{ workers: Worker[]; total: number; page: number; limit: number }> {
    const queryBuilder = this.workerRepository
      .createQueryBuilder('worker')
      .leftJoinAndSelect('worker.institute', 'institute');

    if (filters?.name) {
      queryBuilder.where('LOWER(worker.name) LIKE LOWER(:name)', {
        name: `%${filters.name}%`,
      });
    }

    if (filters?.country) {
      const clause = 'LOWER(worker.country::text) LIKE LOWER(:country)';
      if (filters.name) {
        queryBuilder.andWhere(clause, {
          country: `%${filters.country}%`,
        });
      } else {
        queryBuilder.where(clause, {
          country: `%${filters.country}%`,
        });
      }
    }

    if (filters?.instituteName) {
      queryBuilder.andWhere(
        'LOWER(institute.name) LIKE LOWER(:instituteName)',
        {
          instituteName: `%${filters.instituteName}%`,
        },
      );
    }

    if (filters?.specialty) {
      const specialty = filters.specialty.toLowerCase();
      // Convert both search term and specialties to lowercase strings and do substring matching
      queryBuilder.andWhere(
        `LOWER(CAST(worker.specialties AS text)) LIKE LOWER(:specialty)`,
        { specialty: `%${specialty}%` }
      );
    }

    const total = await queryBuilder.getCount();

    const page = filters?.page && filters.page > 0 ? filters.page : 1;
    const limit = filters?.limit && filters.limit > 0 ? Math.min(filters.limit, 100) : 10;
    const offset = (page - 1) * limit;

    const workers = await queryBuilder
      .orderBy('worker.name', 'ASC')
      .skip(offset)
      .take(limit)
      .getMany();

    return { workers, total, page, limit };
  }

  async update(
    id: number,
    updateData: Partial<Worker>,
  ): Promise<Worker | null> {
    await this.workerRepository.update(id, updateData);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.workerRepository.delete(id);
    return result.affected > 0;
  }

  async existsByName(name: string): Promise<boolean> {
    const count = await this.workerRepository.count({ where: { name } });
    return count > 0;
  }
}
