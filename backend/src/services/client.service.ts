import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from 'src/entities/client.entity';
import { CreatePersonInput } from 'src/types/person.type';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  async findAll(): Promise<Client[]> {
    return await this.clientsRepository.find(); 
  }

  async addClient(createClientData: CreatePersonInput): Promise<Client> {
    const client = this.clientsRepository.create(createClientData);
    return await this.clientsRepository.save(client);
  }
}