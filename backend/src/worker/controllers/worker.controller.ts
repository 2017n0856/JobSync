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

import { WorkerService } from '../services/worker.service';
import { CreateWorkerDto } from '../domain/dtos/create-worker.dto';
import { UpdateWorkerDto } from '../domain/dtos/update-worker.dto';
import { GetWorkerQueryDto } from '../domain/dtos/get-workers-query.dto';
import { WorkerResponseDto } from '../domain/dtos/worker-response.dto';
import { Worker } from '../domain/entities/worker.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { HttpMethodGuard } from '../../common/guards/http-method.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../users/domain/enums/role.enum';

@ApiTags('Worker')
@ApiBearerAuth()
@Controller('worker')
@UseGuards(JwtAuthGuard, HttpMethodGuard)
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Create a new worker',
    description:
      'Creates a new worker with the provided information. Worker names must be unique.',
  })
  @ApiResponse({
    status: 201,
    description: 'Worker created successfully',
    type: WorkerResponseDto,
    content: {
      'application/json': {
        example: WorkerResponseDto.example(),
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Worker with this name already exists',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(
    @Body() createWorkerDto: CreateWorkerDto,
  ): Promise<WorkerResponseDto> {
    const worker = await this.workerService.create(createWorkerDto);
    return this.mapToResponseDto(worker);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all workers with optional filters and pagination',
    description:
      'Retrieves a list of all workers. Supports filtering by name, country (case-insensitive substring), institute name, and specialty (exact, case-insensitive).',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Filter by worker name (case-insensitive substring)',
    example: 'Jane',
  })
  @ApiQuery({
    name: 'country',
    required: false,
    description: 'Filter by country (case-insensitive substring)',
    example: 'United',
  })
  @ApiQuery({
    name: 'instituteName',
    required: false,
    description: 'Filter by institute name (case-insensitive substring)',
    example: 'University',
  })
  @ApiQuery({
    name: 'specialty',
    required: false,
    description: 'Filter by single specialty (exact match, case-insensitive)',
    example: 'FINANCE',
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
    description: 'List of workers retrieved successfully',
    type: [WorkerResponseDto],
    content: {
      'application/json': {
        example: [WorkerResponseDto.example()],
      },
    },
  })
  async findAll(
    @Query() filters: GetWorkerQueryDto,
  ): Promise<{ workers: WorkerResponseDto[]; total: number; page: number; limit: number }> {
    const result = await this.workerService.findAll(filters);
    return {
      workers: result.workers.map((worker) => this.mapToResponseDto(worker)),
      total: result.total,
      page: result.page,
      limit: result.limit,
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a worker by ID',
    description: 'Retrieves a specific worker by their unique identifier.',
  })
  @ApiParam({ name: 'id', description: 'Worker ID', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Worker found successfully',
    type: WorkerResponseDto,
    content: {
      'application/json': {
        example: WorkerResponseDto.example(),
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Worker not found' })
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<WorkerResponseDto> {
    const worker = await this.workerService.findById(id);
    return this.mapToResponseDto(worker);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.EDITOR)
  @ApiOperation({
    summary: 'Update a worker by ID',
    description:
      'Updates an existing worker with the provided information. Worker names must remain unique.',
  })
  @ApiParam({ name: 'id', description: 'Worker ID', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Worker updated successfully',
    type: WorkerResponseDto,
    content: {
      'application/json': {
        example: WorkerResponseDto.example(),
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Worker not found' })
  @ApiResponse({
    status: 409,
    description: 'Worker with this name already exists',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWorkerDto: UpdateWorkerDto,
  ): Promise<WorkerResponseDto> {
    const worker = await this.workerService.update(id, updateWorkerDto);
    return this.mapToResponseDto(worker);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Delete a worker by ID',
    description: 'Permanently deletes a worker and all associated data.',
  })
  @ApiParam({ name: 'id', description: 'Worker ID', example: 1 })
  @ApiResponse({ status: 200, description: 'Worker deleted successfully' })
  @ApiResponse({ status: 404, description: 'Worker not found' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.workerService.delete(id);
  }

  private mapToResponseDto(worker: Worker): WorkerResponseDto {
    return {
      id: worker.id,
      name: worker.name,
      country: worker.country,
      phoneNumber: worker.phoneNumber,
      email: worker.email,
      currency: worker.currency,
      instituteId: worker.instituteId,
      institute: worker.institute
        ? {
            id: worker.institute.id,
            name: worker.institute.name,
          }
        : undefined,
      metadata: worker.metadata,
      specialties: worker.specialties,
    };
  }
}
