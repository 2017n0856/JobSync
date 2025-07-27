import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInstituteDto {
  @ApiProperty({
    description: 'Institute name (must be unique)',
    example: 'Harvard University',
    minLength: 2,
    maxLength: 255,
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name?: string;

  @ApiProperty({
    description: 'Country where the institute is located',
    example: 'United States',
    minLength: 2,
    maxLength: 100,
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  country?: string;
} 