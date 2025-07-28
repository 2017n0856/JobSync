import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TaskAssignmentService } from '../services/task-assignment.service';
import { CreateTaskAssignmentDto } from '../domain/dtos/create-task-assignment.dto';
import { UpdateTaskAssignmentDto } from '../domain/dtos/update-task-assignment.dto';
import { TaskAssignmentResponseDto } from '../domain/dtos/task-assignment-response.dto';
import { TaskAssignment } from '../domain/entities/task-assignment.entity';

@ApiTags('Task Assignment')
@Controller('task-assignment')
export class TaskAssignmentController {
  constructor(private readonly taskAssignmentService: TaskAssignmentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task assignment' })
  @ApiResponse({ status: 201, description: 'Task assignment created successfully', type: TaskAssignmentResponseDto })
  async create(@Body() createTaskAssignmentDto: CreateTaskAssignmentDto): Promise<TaskAssignmentResponseDto> {
    const taskAssignment = await this.taskAssignmentService.create(createTaskAssignmentDto);
    return this.mapToResponseDto(taskAssignment);
  }

  @Get()
  @ApiOperation({ summary: 'Get all task assignment' })
  @ApiResponse({ status: 200, description: 'List of task assignment', type: [TaskAssignmentResponseDto] })
  async findAll(): Promise<TaskAssignmentResponseDto[]> {
    const taskAssignments = await this.taskAssignmentService.findAll();
    return taskAssignments.map(taskAssignment => this.mapToResponseDto(taskAssignment));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task assignment by ID' })
  @ApiParam({ name: 'id', description: 'Task assignment ID' })
  @ApiResponse({ status: 200, description: 'Task assignment found', type: TaskAssignmentResponseDto })
  @ApiResponse({ status: 404, description: 'Task assignment not found' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<TaskAssignmentResponseDto> {
    const taskAssignment = await this.taskAssignmentService.findById(id);
    return this.mapToResponseDto(taskAssignment);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task assignment by ID' })
  @ApiParam({ name: 'id', description: 'Task assignment ID' })
  @ApiResponse({ status: 200, description: 'Task assignment updated successfully', type: TaskAssignmentResponseDto })
  @ApiResponse({ status: 404, description: 'Task assignment not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskAssignmentDto: UpdateTaskAssignmentDto,
  ): Promise<TaskAssignmentResponseDto> {
    const taskAssignment = await this.taskAssignmentService.update(id, updateTaskAssignmentDto);
    return this.mapToResponseDto(taskAssignment);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task assignment by ID' })
  @ApiParam({ name: 'id', description: 'Task assignment ID' })
  @ApiResponse({ status: 200, description: 'Task assignment deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task assignment not found' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.taskAssignmentService.delete(id);
  }

  private mapToResponseDto(taskAssignment: TaskAssignment): TaskAssignmentResponseDto {
    return {
      id: taskAssignment.id,
      taskId: taskAssignment.taskId,
      workerId: taskAssignment.workerId,
      task: taskAssignment.task ? {
        id: taskAssignment.task.id,
        name: taskAssignment.task.name,
      } : undefined,
      worker: taskAssignment.worker ? {
        id: taskAssignment.worker.id,
        name: taskAssignment.worker.name,
      } : undefined,
      paymentDecided: taskAssignment.paymentDecided,
      paymentMade: taskAssignment.paymentMade,
    };
  }
} 