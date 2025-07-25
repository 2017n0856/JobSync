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

  @Query(() => Task, { nullable: true })
  async getTaskById(@Args('id') id: number): Promise<Task | null> {
    return await this.taskService.findById(id);
  }

  @Query(() => Task, { nullable: true })
  async getTaskByName(@Args('name') name: string): Promise<Task | null> {
    return await this.taskService.findByName(name);
  }

  @Mutation(() => Task)
  async addTask(
    @Args('createTaskData') createTaskData: CreateTaskInput,
  ): Promise<Task> {
    return await this.taskService.addTask(createTaskData);
  }

  @Mutation(() => Task)
  async updateTask(
    @Args('id') id: number,
    @Args('updateData') updateData: CreateTaskInput,
  ): Promise<Task> {
    return await this.taskService.updateTask(id, updateData);
  }

  @Mutation(() => Boolean)
  async deleteTask(@Args('id') id: number): Promise<boolean> {
    return await this.taskService.deleteTask(id);
  }
}
