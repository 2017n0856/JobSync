import { IsString, IsNotEmpty, MinLength, MaxLength, IsOptional, IsJSON } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInstituteDto {
  @ApiProperty({
    description: 'Institute name (must be unique)',
    example: 'Harvard University',
    minLength: 2,
    maxLength: 255
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({
    description: 'Country where the institute is located',
    example: 'United States',
    minLength: 2,
    maxLength: 30
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  country?: string;

  @ApiPropertyOptional({
    description: 'Additional metadata as JSON',
    example: { founded: 1636, type: 'University', accreditation: 'Regional' }
  })
  @IsOptional()
  metadata?: Record<string, any>;
} 