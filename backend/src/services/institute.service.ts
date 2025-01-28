import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Institute } from 'src/entities/institute.entity';
import { CreateInstituteInput } from 'src/types/institute.type';

@Injectable()
export class InstituteService {
  constructor(
    @InjectRepository(Institute)
    private instituteRepository: Repository<Institute>,
  ) {}

  async findAll(): Promise<Institute[]> {
    return await this.instituteRepository.find(); 
  }

  async addInstitute(createInstituteData: CreateInstituteInput): Promise<Institute> {
    const institute = this.instituteRepository.create(createInstituteData);
    return await this.instituteRepository.save(institute);
  }
}