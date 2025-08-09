import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ClientRepository } from '../repositories/client.repository';
import { CreateClientDto } from '../domain/dtos/create-client.dto';
import { UpdateClientDto } from '../domain/dtos/update-client.dto';
import { GetClientQueryDto } from '../domain/dtos/get-clients-query.dto';
import { Client } from '../domain/entities/client.entity';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const existingClient = await this.clientRepository.findByName(
      createClientDto.name,
    );
    if (existingClient) {
      throw new ConflictException(
        `Client with name '${createClientDto.name}' already exists`,
      );
    }

    return await this.clientRepository.create(createClientDto);
  }

  async findAll(
    filters?: GetClientQueryDto,
  ): Promise<{ clients: Client[]; total: number; page: number; limit: number }> {
    return await this.clientRepository.findAll(filters);
  }

  async findById(id: number): Promise<Client> {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const existingClient = await this.clientRepository.findById(id);
    if (!existingClient) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    if (updateClientDto.name && updateClientDto.name !== existingClient.name) {
      const clientWithSameName = await this.clientRepository.findByName(
        updateClientDto.name,
      );
      if (clientWithSameName) {
        throw new ConflictException(
          `Client with name '${updateClientDto.name}' already exists`,
        );
      }
    }

    const updatedClient = await this.clientRepository.update(
      id,
      updateClientDto,
    );
    if (!updatedClient) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return updatedClient;
  }

  async delete(id: number): Promise<void> {
    const deleted = await this.clientRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
  }
}
