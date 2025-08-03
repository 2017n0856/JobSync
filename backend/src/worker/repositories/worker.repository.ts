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

  async findAll(filters?: GetWorkerQueryDto): Promise<Worker[]> {
    const queryBuilder = this.workerRepository
      .createQueryBuilder('worker')
      .leftJoinAndSelect('worker.institute', 'institute');

    if (filters?.name) {
      queryBuilder.where('LOWER(worker.name) LIKE LOWER(:name)', {
        name: `%${filters.name}%`,
      });
    }

    if (filters?.country) {
      if (filters.name) {
        queryBuilder.andWhere('worker.country = :country', {
          country: filters.country,
        });
      } else {
        queryBuilder.where('worker.country = :country', {
          country: filters.country,
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

    if (filters?.specialties && filters.specialties.length > 0) {
      // Filter workers who have any of the specified specialties
      const specialtyConditions = filters.specialties.map(
        (_, index) => `worker.specialties LIKE :specialty${index}`,
      );
      const specialtyParams = filters.specialties.reduce(
        (acc, specialty, index) => {
          acc[`specialty${index}`] = `%${specialty}%`;
          return acc;
        },
        {} as Record<string, string>,
      );

      queryBuilder.andWhere(
        `(${specialtyConditions.join(' OR ')})`,
        specialtyParams,
      );
    }

    return await queryBuilder.orderBy('worker.name', 'ASC').getMany();
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
