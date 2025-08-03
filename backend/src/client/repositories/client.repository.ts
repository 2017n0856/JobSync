import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogQuery } from '../../common/decorators/log-query.decorator';
import { GetClientQueryDto } from '../domain/dtos/get-clients-query.dto';
import { Client } from '../domain/entities/client.entity';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  @LogQuery()
  async create(clientData: Partial<Client>): Promise<Client> {
    const client = this.clientRepository.create(clientData);
    return await this.clientRepository.save(client);
  }

  @LogQuery()
  async findById(id: number): Promise<Client | null> {
    return await this.clientRepository.findOne({
      where: { id },
      relations: ['institute'],
    });
  }

  async findByName(name: string): Promise<Client | null> {
    return await this.clientRepository.findOne({ where: { name } });
  }

  @LogQuery()
  async findAll(filters?: GetClientQueryDto): Promise<Client[]> {
    const queryBuilder = this.clientRepository
      .createQueryBuilder('client')
      .leftJoinAndSelect('client.institute', 'institute');

    if (filters?.name) {
      queryBuilder.where('LOWER(client.name) LIKE LOWER(:name)', {
        name: `%${filters.name}%`,
      });
    }

    if (filters?.country) {
      if (filters.name) {
        queryBuilder.andWhere('client.country = :country', {
          country: filters.country,
        });
      } else {
        queryBuilder.where('client.country = :country', {
          country: filters.country,
        });
      }
    }

    if (filters?.instituteName) {
      queryBuilder.andWhere(
        'LOWER(institute.name) LIKE LOWER(:instituteName)',
        {
          instituteName: `%${filters.instituteName}%`,
        },
      );
    }

    return await queryBuilder.orderBy('client.name', 'ASC').getMany();
  }

  async update(
    id: number,
    updateData: Partial<Client>,
  ): Promise<Client | null> {
    await this.clientRepository.update(id, updateData);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.clientRepository.delete(id);
    return result.affected > 0;
  }

  async existsByName(name: string): Promise<boolean> {
    const count = await this.clientRepository.count({ where: { name } });
    return count > 0;
  }
}
