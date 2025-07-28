import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { WorkerRepository } from '../repositories/worker.repository';
import { CreateWorkerDto } from '../domain/dtos/create-worker.dto';
import { UpdateWorkerDto } from '../domain/dtos/update-worker.dto';
import { GetWorkerQueryDto } from '../domain/dtos/get-workers-query.dto';
import { Worker } from '../domain/entities/worker.entity';


@Injectable()
export class WorkerService {
  constructor(private readonly workerRepository: WorkerRepository) {}

  async create(createWorkerDto: CreateWorkerDto): Promise<Worker> {
    // Check if worker with same name already exists
    const existingWorker = await this.workerRepository.findByName(createWorkerDto.name);
    if (existingWorker) {
      throw new ConflictException(`Worker with name '${createWorkerDto.name}' already exists`);
    }

    return await this.workerRepository.create(createWorkerDto);
  }

  async findAll(filters?: GetWorkerQueryDto): Promise<Worker[]> {
    return await this.workerRepository.findAll(filters);
  }

  async findById(id: number): Promise<Worker> {
    const worker = await this.workerRepository.findById(id);
    if (!worker) {
      throw new NotFoundException(`Worker with ID ${id} not found`);
    }
    return worker;
  }

  async update(id: number, updateWorkerDto: UpdateWorkerDto): Promise<Worker> {
    // Check if worker exists
    const existingWorker = await this.workerRepository.findById(id);
    if (!existingWorker) {
      throw new NotFoundException(`Worker with ID ${id} not found`);
    }

    // If name is being updated, check for conflicts
    if (updateWorkerDto.name && updateWorkerDto.name !== existingWorker.name) {
      const workerWithSameName = await this.workerRepository.findByName(updateWorkerDto.name);
      if (workerWithSameName) {
        throw new ConflictException(`Worker with name '${updateWorkerDto.name}' already exists`);
      }
    }

    const updatedWorker = await this.workerRepository.update(id, updateWorkerDto);
    if (!updatedWorker) {
      throw new NotFoundException(`Worker with ID ${id} not found`);
    }
    return updatedWorker;
  }

  async delete(id: number): Promise<void> {
    const deleted = await this.workerRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Worker with ID ${id} not found`);
    }
  }


} 