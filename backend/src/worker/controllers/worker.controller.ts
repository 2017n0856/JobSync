import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

import { WorkerService } from '../services/worker.service';
import { CreateWorkerDto } from '../domain/dtos/create-worker.dto';
import { UpdateWorkerDto } from '../domain/dtos/update-worker.dto';
import { GetWorkerQueryDto } from '../domain/dtos/get-workers-query.dto';
import { WorkerResponseDto } from '../domain/dtos/worker-response.dto';
import { Worker } from '../domain/entities/worker.entity';

@ApiTags('Worker')
@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new worker' })
  @ApiResponse({ status: 201, description: 'Worker created successfully', type: WorkerResponseDto })
  @ApiResponse({ status: 409, description: 'Worker with this name already exists' })
  async create(@Body() createWorkerDto: CreateWorkerDto): Promise<WorkerResponseDto> {
    const worker = await this.workerService.create(createWorkerDto);
    return this.mapToResponseDto(worker);
  }

  @Get()
  @ApiOperation({ summary: 'Get all worker with optional filters' })
  @ApiQuery({ name: 'name', required: false, description: 'Filter by worker name' })
  @ApiQuery({ name: 'country', required: false, description: 'Filter by country' })
  @ApiQuery({ name: 'instituteName', required: false, description: 'Filter by institute name' })
  @ApiQuery({ name: 'specialties', required: false, description: 'Filter by specialties (comma-separated)' })
  @ApiResponse({ status: 200, description: 'List of worker', type: [WorkerResponseDto] })
  async findAll(@Query() filters: GetWorkerQueryDto): Promise<WorkerResponseDto[]> {
    const workers = await this.workerService.findAll(filters);
    return workers.map(worker => this.mapToResponseDto(worker));
  }



  @Get(':id')
  @ApiOperation({ summary: 'Get a worker by ID' })
  @ApiParam({ name: 'id', description: 'Worker ID' })
  @ApiResponse({ status: 200, description: 'Worker found', type: WorkerResponseDto })
  @ApiResponse({ status: 404, description: 'Worker not found' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<WorkerResponseDto> {
    const worker = await this.workerService.findById(id);
    return this.mapToResponseDto(worker);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a worker by ID' })
  @ApiParam({ name: 'id', description: 'Worker ID' })
  @ApiResponse({ status: 200, description: 'Worker updated successfully', type: WorkerResponseDto })
  @ApiResponse({ status: 404, description: 'Worker not found' })
  @ApiResponse({ status: 409, description: 'Worker with this name already exists' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWorkerDto: UpdateWorkerDto,
  ): Promise<WorkerResponseDto> {
    const worker = await this.workerService.update(id, updateWorkerDto);
    return this.mapToResponseDto(worker);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a worker by ID' })
  @ApiParam({ name: 'id', description: 'Worker ID' })
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
      instituteId: worker.instituteId,
      institute: worker.institute ? {
        id: worker.institute.id,
        name: worker.institute.name,
      } : undefined,
      metadata: worker.metadata,
      specialties: worker.specialties,
    };
  }
} 