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
  async findAll(
    filters?: GetClientQueryDto,
  ): Promise<{ clients: Client[]; total: number; page: number; limit: number }> {
    const queryBuilder = this.clientRepository
      .createQueryBuilder('client')
      .leftJoinAndSelect('client.institute', 'institute');

    if (filters?.name) {
      queryBuilder.where('LOWER(client.name) LIKE LOWER(:name)', {
        name: `%${filters.name}%`,
      });
    }

    if (filters?.country) {
      const clause = 'LOWER(client.country::text) LIKE LOWER(:country)';
      if (filters.name) {
        queryBuilder.andWhere(clause, {
          country: `%${filters.country}%`,
        });
      } else {
        queryBuilder.where(clause, {
          country: `%${filters.country}%`,
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

    const total = await queryBuilder.getCount();

    const page = filters?.page && filters.page > 0 ? filters.page : 1;
    const limit = filters?.limit && filters.limit > 0 ? Math.min(filters.limit, 100) : 10;
    const offset = (page - 1) * limit;

    const clients = await queryBuilder
      .orderBy('client.name', 'ASC')
      .skip(offset)
      .take(limit)
      .getMany();

    return { clients, total, page, limit };
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
