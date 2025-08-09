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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ClientService } from '../services/client.service';
import { CreateClientDto } from '../domain/dtos/create-client.dto';
import { UpdateClientDto } from '../domain/dtos/update-client.dto';
import { GetClientQueryDto } from '../domain/dtos/get-clients-query.dto';
import { ClientResponseDto } from '../domain/dtos/client-response.dto';
import { Client } from '../domain/entities/client.entity';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new client',
    description:
      'Creates a new client with the provided information. Client names must be unique.',
  })
  @ApiResponse({
    status: 201,
    description: 'Client created successfully',
    type: ClientResponseDto,
    content: {
      'application/json': {
        example: ClientResponseDto.example(),
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Client with this name already exists',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(
    @Body() createClientDto: CreateClientDto,
  ): Promise<ClientResponseDto> {
    const client = await this.clientService.create(createClientDto);
    return this.mapToResponseDto(client);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all clients with optional filters and pagination',
    description:
      'Retrieves a list of all clients. Supports filtering by name, country (input), and institute name.',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Filter by client name (case-insensitive substring)',
    example: 'Acme',
  })
  @ApiQuery({
    name: 'country',
    required: false,
    description: 'Filter by country (input, case-insensitive substring)',
    example: 'United',
  })
  @ApiQuery({
    name: 'instituteName',
    required: false,
    description: 'Filter by institute name (case-insensitive substring)',
    example: 'University',
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
    description: 'List of clients retrieved successfully',
    type: [ClientResponseDto],
    content: {
      'application/json': {
        example: [ClientResponseDto.example()],
      },
    },
  })
  async findAll(
    @Query() filters: GetClientQueryDto,
  ): Promise<{ clients: ClientResponseDto[]; total: number; page: number; limit: number }> {
    const result = await this.clientService.findAll(filters);
    return {
      clients: result.clients.map((client) => this.mapToResponseDto(client)),
      total: result.total,
      page: result.page,
      limit: result.limit,
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a client by ID',
    description: 'Retrieves a specific client by their unique identifier.',
  })
  @ApiParam({ name: 'id', description: 'Client ID', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Client found successfully',
    type: ClientResponseDto,
    content: {
      'application/json': {
        example: ClientResponseDto.example(),
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ClientResponseDto> {
    const client = await this.clientService.findById(id);
    return this.mapToResponseDto(client);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a client by ID',
    description:
      'Updates an existing client with the provided information. Client names must remain unique.',
  })
  @ApiParam({ name: 'id', description: 'Client ID', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Client updated successfully',
    type: ClientResponseDto,
    content: {
      'application/json': {
        example: ClientResponseDto.example(),
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Client not found' })
  @ApiResponse({
    status: 409,
    description: 'Client with this name already exists',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<ClientResponseDto> {
    const client = await this.clientService.update(id, updateClientDto);
    return this.mapToResponseDto(client);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a client by ID',
    description: 'Permanently deletes a client and all associated data.',
  })
  @ApiParam({ name: 'id', description: 'Client ID', example: 1 })
  @ApiResponse({ status: 200, description: 'Client deleted successfully' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.clientService.delete(id);
  }

  private mapToResponseDto(client: Client): ClientResponseDto {
    return {
      id: client.id,
      name: client.name,
      country: client.country,
      phoneNumber: client.phoneNumber,
      email: client.email,
      currency: client.currency,
      instituteId: client.instituteId,
      institute: client.institute
        ? {
            id: client.institute.id,
            name: client.institute.name,
          }
        : undefined,
      metadata: client.metadata,
    };
  }
}
