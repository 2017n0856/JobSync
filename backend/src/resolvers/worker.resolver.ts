import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseFilters } from '@nestjs/common';
import { GraphqlExceptionFilter } from 'src/common/exceptions.filter';
import { Worker } from 'src/entities/worker.entity';
import { WorkerService } from 'src/services/worker.service';
import { CreatePersonInput } from 'src/types/person.type';

@Resolver(of => Worker)
@UseFilters(new GraphqlExceptionFilter())
export class WorkerResolver {
  constructor(private workerService: WorkerService) {}

  @Query(()=>[Worker])
  async getWorkers(): Promise<Worker[]> {
    const data = await this.workerService.findAll();
    return data;
  }

  @Mutation(returns => Worker)
  async addWorker(
    @Args('createWorkerData') createWorkerData: CreatePersonInput,
  ): Promise<Worker> {
    return this.workerService.addWorker(createWorkerData);
  }
}
