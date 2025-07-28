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

  @ApiProperty({
    description: 'Country where the institute is located',
    example: 'United States',
    minLength: 2,
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  country: string;

  @ApiPropertyOptional({
    description: 'Additional metadata as JSON',
    example: { founded: 1636, type: 'University', accreditation: 'Regional' }
  })
  @IsOptional()
  @IsJSON()
  metadata?: Record<string, any>;
} 