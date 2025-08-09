import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InstituteRepository } from '../repositories/institute.repository';
import { CreateInstituteDto } from '../domain/dtos/create-institute.dto';
import { UpdateInstituteDto } from '../domain/dtos/update-institute.dto';
import { InstituteResponseDto } from '../domain/dtos/institute-response.dto';
import { GetInstitutesQueryDto } from '../domain/dtos/get-institutes-query.dto';
import { Institute } from '../domain/entities/institute.entity';

@Injectable()
export class InstituteService {
  constructor(
    private readonly instituteRepository: InstituteRepository,
  ) {}

  async createInstitute(
    createInstituteDto: CreateInstituteDto,
  ): Promise<InstituteResponseDto> {
    const existingInstitute = await this.instituteRepository.findByName(
      createInstituteDto.name,
    );
    if (existingInstitute) {
      throw new ConflictException('Institute with this name already exists');
    }

    const institute = await this.instituteRepository.create({
      name: createInstituteDto.name,
      country: createInstituteDto.country,
      metadata: createInstituteDto.metadata,
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

  async findAllInstitutes(
    query: GetInstitutesQueryDto,
  ): Promise<{ institutes: InstituteResponseDto[]; total: number; page: number; limit: number }> {
    const result = await this.instituteRepository.findAllPaginated(
      query.country,
      query.name,
      query.page,
      query.limit,
    );
    return {
      institutes: result.institutes.map((i) => this.mapToResponseType(i)),
      total: result.total,
      page: result.page,
      limit: result.limit,
    };
  }

  async updateInstitute(
    id: number,
    updateInstituteDto: UpdateInstituteDto,
  ): Promise<InstituteResponseDto> {
    const existingInstitute = await this.instituteRepository.findById(id);
    if (!existingInstitute) {
      throw new NotFoundException('Institute not found');
    }

    if (
      updateInstituteDto.name &&
      updateInstituteDto.name !== existingInstitute.name
    ) {
      const instituteWithSameName = await this.instituteRepository.findByName(
        updateInstituteDto.name,
      );
      if (instituteWithSameName) {
        throw new ConflictException('Institute with this name already exists');
      }
    }

    const updatedInstitute = await this.instituteRepository.update(
      id,
      updateInstituteDto,
    );
    if (!updatedInstitute) {
      throw new NotFoundException('Failed to update institute');
    }

    return this.mapToResponseType(updatedInstitute);
  }

  async deleteInstitute(id: number): Promise<void> {
    const deleted = await this.instituteRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Institute not found');
    }
  }

  private mapToResponseType(institute: Institute): InstituteResponseDto {
    return {
      id: institute.id,
      name: institute.name,
      country: institute.country,
      metadata: institute.metadata,
    };
  }
}
