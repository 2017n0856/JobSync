import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../domain/dtos/create-task.dto';
import { UpdateTaskDto } from '../domain/dtos/update-task.dto';
import { GetTaskQueryDto } from '../domain/dtos/get-tasks-query.dto';
import { TaskResponseDto } from '../domain/dtos/task-response.dto';
import { Task } from '../domain/entities/task.entity';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully', type: TaskResponseDto })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    const task = await this.taskService.create(createTaskDto);
    return this.mapToResponseDto(task);
  }

  @Get()
  @ApiOperation({ summary: 'Get all task with optional filters' })
  @ApiQuery({ name: 'name', required: false, description: 'Filter by task name' })
  @ApiQuery({ name: 'status', required: false, description: 'Filter by status' })
  @ApiQuery({ name: 'deadlineDateFrom', required: false, description: 'Filter by deadline date from' })
  @ApiQuery({ name: 'deadlineDateTo', required: false, description: 'Filter by deadline date to' })
  @ApiQuery({ name: 'clientId', required: false, description: 'Filter by client ID' })
  @ApiQuery({ name: 'workerId', required: false, description: 'Filter by worker ID' })
  @ApiQuery({ name: 'taskType', required: false, description: 'Filter by task type' })
  @ApiResponse({ status: 200, description: 'List of task', type: [TaskResponseDto] })
  async findAll(@Query() filters: GetTaskQueryDto): Promise<TaskResponseDto[]> {
    const tasks = await this.taskService.findAll(filters);
    return tasks.map(task => this.mapToResponseDto(task));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({ status: 200, description: 'Task found', type: TaskResponseDto })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<TaskResponseDto> {
    const task = await this.taskService.findById(id);
    return this.mapToResponseDto(task);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({ status: 200, description: 'Task updated successfully', type: TaskResponseDto })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    const task = await this.taskService.update(id, updateTaskDto);
    return this.mapToResponseDto(task);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.taskService.delete(id);
  }

  private mapToResponseDto(task: Task): TaskResponseDto {
    return {
      id: task.id,
      name: task.name,
      description: task.description,
      deadlineTime: task.deadlineTime,
      deadlineDate: task.deadlineDate,
      submittedOnDate: task.submittedOnDate,
      paymentDecided: task.paymentDecided,
      paymentMade: task.paymentMade,
      clientId: task.clientId,
      client: task.client ? {
        id: task.client.id,
        name: task.client.name,
      } : undefined,
      taskType: task.taskType,
    };
  }
} 