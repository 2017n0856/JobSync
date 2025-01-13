// src/resolvers/client.resolver.ts
import { Resolver } from '@nestjs/graphql';
import { UseFilters } from '@nestjs/common';
import { GraphqlExceptionFilter } from 'src/common/exceptions.filter';
import { Task } from 'src/entities/task.entity';
import { TaskService } from 'src/services/task.service';

@Resolver(of => Task)
@UseFilters(new GraphqlExceptionFilter())
export class TaskResolver {
  constructor(private taskService: TaskService) {}

}
