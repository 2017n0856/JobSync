import { IsOptional, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetInstitutesQueryDto {
  @ApiProperty({
    description: 'Filter institutes by country name',
    example: 'United States',
    required: false,
    minLength: 2,
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  country?: string;
} 