import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Worker } from 'src/entities/worker.entity';
import { WorkerService } from 'src/services/worker.service';
import { CreatePersonInput } from 'src/types/person.type';

@Resolver(() => Worker)
export class WorkerResolver {
  constructor(private workerService: WorkerService) {}

  @Query(() => [Worker])
  async getWorkers(): Promise<Worker[]> {
    const data = await this.workerService.findAll();
    return data;
  }

  @Mutation(() => Worker)
  async addWorker(
    @Args('createWorkerData') createWorkerData: CreatePersonInput,
  ): Promise<Worker> {
    return this.workerService.addWorker(createWorkerData);
  }
}
