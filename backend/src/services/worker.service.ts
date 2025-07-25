import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Worker } from 'src/entities/worker.entity';
import { CreatePersonInput } from 'src/types/person.type';

@Injectable()
export class WorkerService {
  constructor(
    @InjectRepository(Worker)
    private workerRepository: Repository<Worker>,
  ) {}

  async findAll(): Promise<Worker[]> {
    return await this.workerRepository.find({
      relations: ['tasks'],
    });
  }

  async findById(id: number): Promise<Worker | null> {
    return await this.workerRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
  }

  async findByName(name: string): Promise<Worker | null> {
    return await this.workerRepository.findOne({
      where: { name },
      relations: ['tasks'],
    });
  }

  async addWorker(createWorkerData: CreatePersonInput): Promise<Worker> {
    const worker = this.workerRepository.create(createWorkerData);
    return await this.workerRepository.save(worker);
  }

  async updateWorker(id: number, updateWorkerData: CreatePersonInput): Promise<Worker> {
    const worker = await this.workerRepository.findOne({ where: { id } });
    if (!worker) {
      throw new NotFoundException(`Worker with ID ${id} not found`);
    }

    await this.workerRepository.update(id, updateWorkerData);
    return await this.workerRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
  }

  async deleteWorker(id: number): Promise<boolean> {
    const worker = await this.workerRepository.findOne({ where: { id } });
    if (!worker) {
      throw new NotFoundException(`Worker with ID ${id} not found`);
    }

    await this.workerRepository.remove(worker);
    return true;
  }
}
