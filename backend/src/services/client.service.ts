import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from 'src/entities/client.entity';
import { CreateClientInput } from 'src/types/client.type';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  async findAll(): Promise<Client[]> {
    return await this.clientsRepository.find(); 
  }

  async addClient(createClientData: CreateClientInput): Promise<Client> {
    const client = this.clientsRepository.create(createClientData);
    return await this.clientsRepository.save(client);
  }
}