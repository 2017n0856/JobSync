import { Injectable, NotFoundException } from '@nestjs/common';
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
    return await this.clientsRepository.find({
      relations: ['tasks'],
    });
  }

  async findById(id: number): Promise<Client | null> {
    return await this.clientsRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
  }

  async findByName(name: string): Promise<Client | null> {
    return await this.clientsRepository.findOne({
      where: { name },
      relations: ['tasks'],
    });
  }

  async addClient(createClientData: CreatePersonInput): Promise<Client> {
    const client = this.clientsRepository.create(createClientData);
    return await this.clientsRepository.save(client);
  }

  async updateClient(id: number, updateData: CreatePersonInput): Promise<Client> {
    const client = await this.clientsRepository.findOne({ where: { id } });
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    await this.clientsRepository.update(id, updateData);
    return await this.clientsRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
  }

  async deleteClient(id: number): Promise<boolean> {
    const client = await this.clientsRepository.findOne({ where: { id } });
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    await this.clientsRepository.remove(client);
    return true;
  }
}
