import { ApiProperty } from '@nestjs/swagger';

export class InstituteResponseDto {
  @ApiProperty({
    description: 'Institute ID',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'Institute name',
    example: 'Harvard University'
  })
  name: string;

  @ApiProperty({
    description: 'Country where the institute is located',
    example: 'United States'
  })
  country: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-01T00:00:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-01T00:00:00.000Z'
  })
  updatedAt: Date;

  static example(): InstituteResponseDto {
    return {
      id: 1,
      name: 'Harvard University',
      country: 'United States',
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
      updatedAt: new Date('2024-01-01T00:00:00.000Z')
    };
  }
} 