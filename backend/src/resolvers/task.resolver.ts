import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseFilters } from '@nestjs/common';
import { GlobalExceptionFilter } from 'src/common/exceptions.filter';
import { Task } from 'src/entities/task.entity';
import { TaskService } from 'src/services/task.service';
import { CreateTaskInput } from 'src/types/task.type';

@Resolver(() => Task)
@UseFilters(new GlobalExceptionFilter())
export class TaskResolver {
  constructor(private taskService: TaskService) {}

  @Query(() => [Task])
  async getTasks(): Promise<Task[]> {
    const data = await this.taskService.findAll();
    return data;
  }

  @Mutation(() => Task)
  async addTask(
    @Args('createTaskData') createTaskData: CreateTaskInput,
  ): Promise<Task> {
    return this.taskService.addTask(createTaskData);
  }
}
