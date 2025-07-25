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

  @Query(() => TaskAssignment, { nullable: true })
  async getTaskAssignmentById(
    @Args('taskId') taskId: number,
    @Args('workerId') workerId: number,
  ): Promise<TaskAssignment | null> {
    return await this.taskAssignmentService.findById(taskId, workerId);
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

  @Mutation(() => TaskAssignment)
  async updateTaskAssignment(
    @Args('taskId') taskId: number,
    @Args('workerId') workerId: number,
    @Args('updateData') updateData: CreateTaskAssignmentInput,
  ): Promise<TaskAssignment> {
    return await this.taskAssignmentService.updateTaskAssignment(
      taskId,
      workerId,
      updateData,
    );
  }

  @Mutation(() => Boolean)
  async deleteTaskAssignment(
    @Args('taskId') taskId: number,
    @Args('workerId') workerId: number,
  ): Promise<boolean> {
    return await this.taskAssignmentService.deleteTaskAssignment(taskId, workerId);
  }
}
