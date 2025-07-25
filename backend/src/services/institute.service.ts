import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findById(id: number): Promise<Institute | null> {
    return await this.instituteRepository.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<Institute | null> {
    return await this.instituteRepository.findOne({ where: { name } });
  }

  async addInstitute(
    createInstituteData: CreateInstituteInput,
  ): Promise<Institute> {
    const institute = this.instituteRepository.create(createInstituteData);
    return await this.instituteRepository.save(institute);
  }

  async updateInstitute(
    id: number,
    updateInstituteData: CreateInstituteInput,
  ): Promise<Institute> {
    const institute = await this.instituteRepository.findOne({ where: { id } });
    if (!institute) {
      throw new NotFoundException(`Institute with ID ${id} not found`);
    }

    await this.instituteRepository.update(id, updateInstituteData);
    return await this.instituteRepository.findOne({ where: { id } });
  }

  async deleteInstitute(id: number): Promise<boolean> {
    const institute = await this.instituteRepository.findOne({ where: { id } });
    if (!institute) {
      throw new NotFoundException(`Institute with ID ${id} not found`);
    }

    await this.instituteRepository.remove(institute);
    return true;
  }
}
