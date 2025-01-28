import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonInput } from 'src/types/person.type';
import { Worker } from 'src/entities/worker.entity';

@Injectable()
export class WorkerService {
  constructor(
    @InjectRepository(Worker)
    private workersRepository: Repository<Worker>,
  ) {}

  async findAll(): Promise<Worker[]> {
    return await this.workersRepository.find(); 
  }

  async addWorker(createClientData: CreatePersonInput): Promise<Worker> {
    const client = this.workersRepository.create(createClientData);
    return await this.workersRepository.save(client);
  }
}