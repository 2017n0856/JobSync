import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskAssignmentService } from 'src/services/taskAssignment.service';
import { CreateTaskAssignmentInput } from 'src/types/taskAssignment.type';
import { TaskAssignment } from 'src/entities/taskAssignment.entity';

@Resolver(() => TaskAssignment)
export class TaskAssignmentResolver {
  constructor(private readonly taskAssignmentService: TaskAssignmentService) {}

  @Query(() => [TaskAssignment])
  async getTaskAssignments(): Promise<TaskAssignment[]> {
    return await this.taskAssignmentService.findAll();
  }

  @Mutation(() => TaskAssignment)
  async addTaskAssignment(
    @Args('createTaskAssignmentData')
    createTaskAssignmentData: CreateTaskAssignmentInput,
  ): Promise<TaskAssignment> {
    return await this.taskAssignmentService.addTaskAssignment(
      createTaskAssignmentData,
    );
  }
}
