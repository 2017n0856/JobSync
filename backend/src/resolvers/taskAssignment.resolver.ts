// src/resolvers/client.resolver.ts
import { Resolver } from '@nestjs/graphql';
import { UseFilters } from '@nestjs/common';
import { GraphqlExceptionFilter } from 'src/common/exceptions.filter';
import { TaskAssignment } from 'src/entities/taskAssignment.entity';
import { TaskAssignmentService } from 'src/services/taskAssignment.service';

@Resolver(of => TaskAssignment)
@UseFilters(new GraphqlExceptionFilter())
export class TaskAssignmentResolver {
  constructor(private TaskAssignmentService: TaskAssignmentService) {}


}
