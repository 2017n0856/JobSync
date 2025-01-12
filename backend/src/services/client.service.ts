import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from 'src/entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  async findAll(): Promise<Client[]> {
    return await this.clientsRepository.find(); 
  }

  async addClient(clientData: Partial<Client>): Promise<Client> {
      const client = this.clientsRepository.create(clientData);
      await this.clientsRepository.save(client);
      return client;
  }
}