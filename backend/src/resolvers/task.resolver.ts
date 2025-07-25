import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskService } from 'src/services/task.service';
import { CreateTaskInput } from 'src/types/task.type';
import { Task } from 'src/entities/task.entity';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task])
  async getTasks(): Promise<Task[]> {
    return await this.taskService.findAll();
  }

  @Mutation(() => Task)
  async addTask(
    @Args('createTaskData') createTaskData: CreateTaskInput,
  ): Promise<Task> {
    return await this.taskService.addTask(createTaskData);
  }
}
