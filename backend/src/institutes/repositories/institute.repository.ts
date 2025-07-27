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

  async findAll(country?: string, name?: string): Promise<Institute[]> {
    const queryBuilder = this.instituteRepository.createQueryBuilder('institute');
    
    if (country) {
      queryBuilder.where('LOWER(institute.country) LIKE LOWER(:country)', { 
        country: `%${country}%` 
      });
    }
    
    if (name) {
      if (country) {
        queryBuilder.andWhere('LOWER(institute.name) LIKE LOWER(:name)', { 
          name: `%${name}%` 
        });
      } else {
        queryBuilder.where('LOWER(institute.name) LIKE LOWER(:name)', { 
          name: `%${name}%` 
        });
      }
    }
    
    return await queryBuilder.orderBy('institute.name', 'ASC').getMany();
  }

  async findByNameFuzzy(name: string, similarityThreshold: number = 0.3): Promise<Institute[]> {
    // Using PostgreSQL's pg_trgm extension for fuzzy search
    // This requires the pg_trgm extension to be enabled in the database
    return await this.instituteRepository
      .createQueryBuilder('institute')
      .where('similarity(LOWER(institute.name), LOWER(:name)) > :threshold', {
        name: name,
        threshold: similarityThreshold
      })
      .orderBy('similarity(LOWER(institute.name), LOWER(:name))', 'DESC')
      .addOrderBy('institute.name', 'ASC')
      .getMany();
  }

  async findAllWithFuzzy(country?: string, name?: string, similarityThreshold: number = 0.3): Promise<Institute[]> {
    const queryBuilder = this.instituteRepository.createQueryBuilder('institute');
    
    if (country) {
      queryBuilder.where('LOWER(institute.country) LIKE LOWER(:country)', { 
        country: `%${country}%` 
      });
    }
    
    if (name) {
      try {
        // Try to use fuzzy search with pg_trgm extension
        if (country) {
          queryBuilder.andWhere('similarity(LOWER(institute.name), LOWER(:name)) > :threshold', {
            name: name,
            threshold: similarityThreshold
          });
        } else {
          queryBuilder.where('similarity(LOWER(institute.name), LOWER(:name)) > :threshold', {
            name: name,
            threshold: similarityThreshold
          });
        }
        
        // Order by similarity score (highest first) then by name
        queryBuilder.orderBy('similarity(LOWER(institute.name), LOWER(:name))', 'DESC');
      } catch (error) {
        // Fallback to LIKE search if pg_trgm extension is not available
        console.warn('pg_trgm extension not available, falling back to LIKE search');
        if (country) {
          queryBuilder.andWhere('LOWER(institute.name) LIKE LOWER(:name)', { 
            name: `%${name}%` 
          });
        } else {
          queryBuilder.where('LOWER(institute.name) LIKE LOWER(:name)', { 
            name: `%${name}%` 
          });
        }
      }
    }
    
    queryBuilder.addOrderBy('institute.name', 'ASC');
    return await queryBuilder.getMany();
  }

  async findAllWithEnhancedFuzzy(country?: string, name?: string, similarityThreshold: number = 0.3): Promise<Institute[]> {
    const queryBuilder = this.instituteRepository.createQueryBuilder('institute');
    
    if (country) {
      queryBuilder.where('LOWER(institute.country) LIKE LOWER(:country)', { 
        country: `%${country}%` 
      });
    }
    
    if (name) {
      try {
        // Enhanced fuzzy search with substring and multi-word support
        const searchTerms = name.trim().split(/\s+/).filter(term => term.length > 0);
        
        if (searchTerms.length === 1) {
          // Single term search - use similarity for fuzzy matching
          if (country) {
            queryBuilder.andWhere('similarity(LOWER(institute.name), LOWER(:name)) > :threshold', {
              name: name,
              threshold: similarityThreshold
            });
          } else {
            queryBuilder.where('similarity(LOWER(institute.name), LOWER(:name)) > :threshold', {
              name: name,
              threshold: similarityThreshold
            });
          }
        } else {
          // Multi-word search - each term should match somewhere in the name
          const conditions = searchTerms.map((term, index) => 
            `LOWER(institute.name) LIKE LOWER(:term${index})`
          );
          const parameters = searchTerms.reduce((acc, term, index) => {
            acc[`term${index}`] = `%${term}%`;
            return acc;
          }, {} as Record<string, string>);
          
          const whereClause = conditions.join(' AND ');
          
          if (country) {
            queryBuilder.andWhere(`(${whereClause})`, parameters);
          } else {
            queryBuilder.where(`(${whereClause})`, parameters);
          }
        }
        
        // Order by similarity score for single term searches
        if (searchTerms.length === 1) {
          queryBuilder.orderBy('similarity(LOWER(institute.name), LOWER(:name))', 'DESC');
        }
      } catch (error) {
        // Fallback to enhanced LIKE search if pg_trgm extension is not available
        console.warn('pg_trgm extension not available, falling back to enhanced LIKE search');
        const searchTerms = name.trim().split(/\s+/).filter(term => term.length > 0);
        
        if (searchTerms.length === 1) {
          // Single term - simple LIKE search
          if (country) {
            queryBuilder.andWhere('LOWER(institute.name) LIKE LOWER(:name)', { 
              name: `%${name}%` 
            });
          } else {
            queryBuilder.where('LOWER(institute.name) LIKE LOWER(:name)', { 
              name: `%${name}%` 
            });
          }
        } else {
          // Multi-word search - each term should match
          const conditions = searchTerms.map((term, index) => 
            `LOWER(institute.name) LIKE LOWER(:term${index})`
          );
          const parameters = searchTerms.reduce((acc, term, index) => {
            acc[`term${index}`] = `%${term}%`;
            return acc;
          }, {} as Record<string, string>);
          
          const whereClause = conditions.join(' AND ');
          
          if (country) {
            queryBuilder.andWhere(`(${whereClause})`, parameters);
          } else {
            queryBuilder.where(`(${whereClause})`, parameters);
          }
        }
      }
    }
    
    queryBuilder.addOrderBy('institute.name', 'ASC');
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