import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonInput } from 'src/types/person.type';
import { Worker } from 'src/entities/worker.entity';

@Injectable()
export class WorkerService {
  private readonly logger = new Logger(WorkerService.name);

  constructor(
    @InjectRepository(Worker)
    private workersRepository: Repository<Worker>,
  ) {}

  async findAll(): Promise<Worker[]> {
    return await this.workersRepository.find();
  }

  async addWorker(createWorkerData: CreatePersonInput): Promise<Worker> {
    const worker = this.workersRepository.create(createWorkerData);
    return await this.workersRepository.save(worker);
  }
}
