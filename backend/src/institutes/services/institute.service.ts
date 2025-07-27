import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InstituteRepository } from '../repositories/institute.repository';
import { CreateInstituteDto } from '../domain/dtos/create-institute.dto';
import { UpdateInstituteDto } from '../domain/dtos/update-institute.dto';
import { InstituteResponseDto } from '../domain/dtos/institute-response.dto';
import { GetInstitutesQueryDto } from '../domain/dtos/get-institutes-query.dto';
import { Institute } from '../domain/entities/institute.entity';

@Injectable()
export class InstituteService {
  constructor(private readonly instituteRepository: InstituteRepository) {}

  async createInstitute(createInstituteDto: CreateInstituteDto): Promise<InstituteResponseDto> {
    // Check if institute with same name already exists
    const existingInstitute = await this.instituteRepository.findByName(createInstituteDto.name);
    if (existingInstitute) {
      throw new ConflictException('Institute with this name already exists');
    }

    // Create institute
    const institute = await this.instituteRepository.create({
      name: createInstituteDto.name,
      country: createInstituteDto.country,
    });

    return this.mapToResponseType(institute);
  }

  async findInstituteById(id: number): Promise<InstituteResponseDto> {
    const institute = await this.instituteRepository.findById(id);
    if (!institute) {
      throw new NotFoundException('Institute not found');
    }
    return this.mapToResponseType(institute);
  }

  async findAllInstitutes(query: GetInstitutesQueryDto): Promise<InstituteResponseDto[]> {
    const institutes = await this.instituteRepository.findAll(query.country);
    return institutes.map(institute => this.mapToResponseType(institute));
  }

  async updateInstitute(id: number, updateInstituteDto: UpdateInstituteDto): Promise<InstituteResponseDto> {
    // Check if institute exists
    const existingInstitute = await this.instituteRepository.findById(id);
    if (!existingInstitute) {
      throw new NotFoundException('Institute not found');
    }

    // If name is being updated, check for uniqueness
    if (updateInstituteDto.name && updateInstituteDto.name !== existingInstitute.name) {
      const instituteWithSameName = await this.instituteRepository.findByName(updateInstituteDto.name);
      if (instituteWithSameName) {
        throw new ConflictException('Institute with this name already exists');
      }
    }

    // Update institute
    const updatedInstitute = await this.instituteRepository.update(id, updateInstituteDto);
    if (!updatedInstitute) {
      throw new NotFoundException('Failed to update institute');
    }

    return this.mapToResponseType(updatedInstitute);
  }

  private mapToResponseType(institute: Institute): InstituteResponseDto {
    return {
      id: institute.id,
      name: institute.name,
      country: institute.country,
    };
  }
} 