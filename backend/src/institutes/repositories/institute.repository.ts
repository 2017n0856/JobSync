import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Institute } from '../domain/entities/institute.entity';

@Injectable()
export class InstituteRepository {
  constructor(
    @InjectRepository(Institute)
    private readonly instituteRepository: Repository<Institute>,
  ) {}

  async create(instituteData: Partial<Institute>): Promise<Institute> {
    const institute = this.instituteRepository.create(instituteData);
    return await this.instituteRepository.save(institute);
  }

  async findById(id: number): Promise<Institute | null> {
    return await this.instituteRepository.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<Institute | null> {
    return await this.instituteRepository.findOne({ where: { name } });
  }

  async findAll(country?: string): Promise<Institute[]> {
    const queryBuilder = this.instituteRepository.createQueryBuilder('institute');
    
    if (country) {
      queryBuilder.where('LOWER(institute.country) LIKE LOWER(:country)', { 
        country: `%${country}%` 
      });
    }
    
    return await queryBuilder.getMany();
  }

  async update(id: number, updateData: Partial<Institute>): Promise<Institute | null> {
    await this.instituteRepository.update(id, updateData);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.instituteRepository.delete(id);
    return result.affected > 0;
  }

  async existsByName(name: string): Promise<boolean> {
    const count = await this.instituteRepository.count({ where: { name } });
    return count > 0;
  }
} 