import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InstituteResponseDto {
  @ApiProperty({
    description: 'Institute ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Institute name',
    example: 'Harvard University',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Country where the institute is located',
    example: 'United States',
  })
  country?: string;

  @ApiPropertyOptional({
    description: 'Additional metadata as JSON',
    example: { founded: 1636, type: 'University', accreditation: 'Regional' },
  })
  metadata?: Record<string, any>;

  static example(): InstituteResponseDto {
    return {
      id: 1,
      name: 'Harvard University',
      country: 'United States',
      metadata: {
        founded: 1636,
        type: 'University',
        accreditation: 'Regional',
      },
    };
  }
}
