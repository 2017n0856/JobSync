import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { WorkerService } from 'src/services/worker.service';
import { CreatePersonInput } from 'src/types/person.type';
import { Worker } from 'src/entities/worker.entity';

@Resolver(() => Worker)
export class WorkerResolver {
  constructor(private readonly workerService: WorkerService) {}

  @Query(() => [Worker])
  async getWorkers(): Promise<Worker[]> {
    return await this.workerService.findAll();
  }

  @Query(() => Worker, { nullable: true })
  async getWorkerById(@Args('id') id: number): Promise<Worker | null> {
    return await this.workerService.findById(id);
  }

  @Query(() => Worker, { nullable: true })
  async getWorkerByName(@Args('name') name: string): Promise<Worker | null> {
    return await this.workerService.findByName(name);
  }

  @Mutation(() => Worker)
  async addWorker(
    @Args('createWorkerData') createWorkerData: CreatePersonInput,
  ): Promise<Worker> {
    return await this.workerService.addWorker(createWorkerData);
  }

  @Mutation(() => Worker)
  async updateWorker(
    @Args('id') id: number,
    @Args('updateData') updateData: CreatePersonInput,
  ): Promise<Worker> {
    return await this.workerService.updateWorker(id, updateData);
  }

  @Mutation(() => Boolean)
  async deleteWorker(@Args('id') id: number): Promise<boolean> {
    return await this.workerService.deleteWorker(id);
  }
}
