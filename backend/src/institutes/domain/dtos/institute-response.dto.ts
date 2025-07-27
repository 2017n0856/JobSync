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

  static example(): InstituteResponseDto {
    return {
      id: 1,
      name: 'Harvard University',
      country: 'United States'
    };
  }
} 