import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { InstituteService } from '../services/institute.service';
import { CreateInstituteDto } from '../domain/dtos/create-institute.dto';
import { UpdateInstituteDto } from '../domain/dtos/update-institute.dto';
import { InstituteResponseDto } from '../domain/dtos/institute-response.dto';
import { GetInstitutesQueryDto } from '../domain/dtos/get-institutes-query.dto';

@ApiTags('Institute')
@Controller('institute')
export class InstituteController {
  constructor(private readonly instituteService: InstituteService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new institute' })
  @ApiResponse({
    status: 201,
    description: 'Institute created successfully',
    type: InstituteResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  @ApiResponse({
    status: 409,
    description: 'Conflict - institute with this name already exists',
  })
  async createInstitute(
    @Body() createInstituteDto: CreateInstituteDto,
  ): Promise<InstituteResponseDto> {
    return await this.instituteService.createInstitute(createInstituteDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get institute by ID' })
  @ApiParam({ name: 'id', description: 'Institute ID' })
  @ApiResponse({
    status: 200,
    description: 'Institute found',
    type: InstituteResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Institute not found' })
  async getInstituteById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<InstituteResponseDto> {
    return await this.instituteService.findInstituteById(id);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all institutes with optional filters and pagination',
  })
  @ApiQuery({
    name: 'country',
    required: false,
    description: 'Filter institutes by country (case-insensitive substring match)',
    example: 'United States',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Search institutes by name (case-insensitive substring match)',
    example: 'Harvard',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number (default: 1)',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Items per page (default: 10, max: 100)',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'List of institutes',
    type: [InstituteResponseDto],
  })
  async getAllInstitutes(
    @Query() query: GetInstitutesQueryDto,
  ): Promise<{ institutes: InstituteResponseDto[]; total: number; page: number; limit: number }> {
    return await this.instituteService.findAllInstitutes(query);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update institute by ID' })
  @ApiParam({ name: 'id', description: 'Institute ID' })
  @ApiResponse({
    status: 200,
    description: 'Institute updated successfully',
    type: InstituteResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  @ApiResponse({ status: 404, description: 'Institute not found' })
  @ApiResponse({
    status: 409,
    description: 'Conflict - institute with this name already exists',
  })
  async updateInstitute(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInstituteDto: UpdateInstituteDto,
  ): Promise<InstituteResponseDto> {
    return await this.instituteService.updateInstitute(id, updateInstituteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete institute by ID' })
  @ApiParam({ name: 'id', description: 'Institute ID' })
  @ApiResponse({ status: 200, description: 'Institute deleted successfully' })
  @ApiResponse({ status: 404, description: 'Institute not found' })
  async deleteInstitute(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.instituteService.deleteInstitute(id);
  }
}
