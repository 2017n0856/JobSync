// src/resolvers/client.resolver.ts
import { Resolver } from '@nestjs/graphql';
import { UseFilters } from '@nestjs/common';
import { GraphqlExceptionFilter } from 'src/common/exceptions.filter';
import { Worker } from 'src/entities/worker.entity';
import { WorkerService } from 'src/services/worker.service';

@Resolver(of => Worker)
@UseFilters(new GraphqlExceptionFilter())
export class WorkerResolver {
  constructor(private workerService: WorkerService) {}

}
