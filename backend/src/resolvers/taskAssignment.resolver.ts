import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseFilters } from '@nestjs/common';
import { GlobalExceptionFilter } from 'src/common/exceptions.filter';
import { TaskAssignment } from 'src/entities/taskAssignment.entity';
import { TaskAssignmentService } from 'src/services/taskAssignment.service';
import { CreateTaskAssignmentInput } from 'src/types/taskAssignment.type';

@Resolver(of => TaskAssignment)
@UseFilters(new GlobalExceptionFilter())
export class TaskAssignmentResolver {
  constructor(private taskAssignmentService: TaskAssignmentService) {}

  @Query(()=>[TaskAssignment])
  async getTaskAssignments(): Promise<TaskAssignment[]> {
    const data = await this.taskAssignmentService.findAll();
    return data;
  }

  @Mutation(returns => TaskAssignment)
  async addTaskAssignment(
    @Args('createTaskAssignmentData') createTaskAssignmentData: CreateTaskAssignmentInput,
  ): Promise<TaskAssignment> {
    return this.taskAssignmentService.addTaskAssignment(createTaskAssignmentData);
  }

}
