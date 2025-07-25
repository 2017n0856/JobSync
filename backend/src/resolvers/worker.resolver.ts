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

  @Mutation(() => Worker)
  async addWorker(
    @Args('createWorkerData') createWorkerData: CreatePersonInput,
  ): Promise<Worker> {
    return await this.workerService.addWorker(createWorkerData);
  }
}
