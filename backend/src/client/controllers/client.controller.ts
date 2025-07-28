import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ClientService } from '../services/client.service';
import { CreateClientDto } from '../domain/dtos/create-client.dto';
import { UpdateClientDto } from '../domain/dtos/update-client.dto';
import { GetClientQueryDto } from '../domain/dtos/get-clients-query.dto';
import { ClientResponseDto } from '../domain/dtos/client-response.dto';
import { Client } from '../domain/entities/client.entity';

@ApiTags('Client')
@Controller('cient')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({ status: 201, description: 'Client created successfully', type: ClientResponseDto })
  @ApiResponse({ status: 409, description: 'Client with this name already exists' })
  async create(@Body() createClientDto: CreateClientDto): Promise<ClientResponseDto> {
    const client = await this.clientService.create(createClientDto);
    return this.mapToResponseDto(client);
  }

  @Get()
  @ApiOperation({ summary: 'Get all client with optional filters' })
  @ApiQuery({ name: 'name', required: false, description: 'Filter by client name' })
  @ApiQuery({ name: 'country', required: false, description: 'Filter by country' })
  @ApiQuery({ name: 'instituteName', required: false, description: 'Filter by institute name' })
  @ApiResponse({ status: 200, description: 'List of client', type: [ClientResponseDto] })
  async findAll(@Query() filters: GetClientQueryDto): Promise<ClientResponseDto[]> {
    const clients = await this.clientService.findAll(filters);
    return clients.map(client => this.mapToResponseDto(client));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a client by ID' })
  @ApiParam({ name: 'id', description: 'Client ID' })
  @ApiResponse({ status: 200, description: 'Client found', type: ClientResponseDto })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<ClientResponseDto> {
    const client = await this.clientService.findById(id);
    return this.mapToResponseDto(client);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a client by ID' })
  @ApiParam({ name: 'id', description: 'Client ID' })
  @ApiResponse({ status: 200, description: 'Client updated successfully', type: ClientResponseDto })
  @ApiResponse({ status: 404, description: 'Client not found' })
  @ApiResponse({ status: 409, description: 'Client with this name already exists' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<ClientResponseDto> {
    const client = await this.clientService.update(id, updateClientDto);
    return this.mapToResponseDto(client);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a client by ID' })
  @ApiParam({ name: 'id', description: 'Client ID' })
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
      instituteId: client.instituteId,
      institute: client.institute ? {
        id: client.institute.id,
        name: client.institute.name,
      } : undefined,
      metadata: client.metadata,
    };
  }
} 