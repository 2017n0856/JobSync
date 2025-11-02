import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../domain/dtos/create-task.dto';
import { UpdateTaskDto } from '../domain/dtos/update-task.dto';
import { GetTaskQueryDto } from '../domain/dtos/get-tasks-query.dto';
import { TaskResponseDto } from '../domain/dtos/task-response.dto';
import { Task } from '../domain/entities/task.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { HttpMethodGuard } from '../../common/guards/http-method.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../users/domain/enums/role.enum';

@ApiTags('Task')
@ApiBearerAuth()
@Controller('task')
@UseGuards(JwtAuthGuard, HttpMethodGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
    type: TaskResponseDto,
  })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    const task = await this.taskService.create(createTaskDto);
    return this.mapToResponseDto(task);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all tasks with optional filters and pagination',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Filter by task name (case-insensitive substring)',
  })
  @ApiQuery({
    name: 'deadlineDateFrom',
    required: false,
    description: 'Filter by deadline date from',
  })
  @ApiQuery({
    name: 'deadlineDateTo',
    required: false,
    description: 'Filter by deadline date to',
  })
  @ApiQuery({
    name: 'clientName',
    required: false,
    description: 'Filter by client name (case-insensitive substring)',
  })
  @ApiQuery({
    name: 'workerName',
    required: false,
    description: 'Filter by worker name (case-insensitive substring)',
  })
  @ApiQuery({
    name: 'taskStatus',
    required: false,
    description: "Task status: 'assigned' | 'not_assigned' | 'delivered'",
  })
  @ApiQuery({
    name: 'clientPaymentStatus',
    required: false,
    description: "Client payment status: 'yes' | 'no'",
  })
  @ApiQuery({
    name: 'workerPaymentStatus',
    required: false,
    description: "Worker payment status: 'yes' | 'no'",
  })
  @ApiQuery({
    name: 'taskType',
    required: false,
    description: 'Filter by task type',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number (default: 1)',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Items per page (default: 10, max: 100)',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'List of tasks',
    type: [TaskResponseDto],
  })
  async findAll(@Query() filters: GetTaskQueryDto): Promise<{
    tasks: TaskResponseDto[];
    total: number;
    page: number;
    limit: number;
  }> {
    const result = await this.taskService.findAll(filters);
    return {
      tasks: result.tasks.map((task) => this.mapToResponseDto(task)),
      total: result.total,
      page: result.page,
      limit: result.limit,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({
    status: 200,
    description: 'Task found',
    type: TaskResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TaskResponseDto> {
    const task = await this.taskService.findById(id);
    return this.mapToResponseDto(task);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.EDITOR)
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
    type: TaskResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    const task = await this.taskService.update(id, updateTaskDto);
    return this.mapToResponseDto(task);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
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
      clientPaymentDecided: task.clientPaymentDecided,
      clientPaymentMade: task.clientPaymentMade,
      workerPaymentDecided: task.workerPaymentDecided,
      workerPaymentMade: task.workerPaymentMade,
      client: task.client
        ? {
            id: task.client.id,
            name: task.client.name,
            currency: task.client.currency,
          }
        : undefined,
      worker: task.worker
        ? {
            id: task.worker.id,
            name: task.worker.name,
            currency: task.worker.currency,
          }
        : undefined,
      taskType: task.taskType,
      metadata: task.metadata,
    };
  }
}
