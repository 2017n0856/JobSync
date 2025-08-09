import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Country } from '../../../common/enums/country.enum';
import { Currency } from '../../../common/enums/currency.enum';

export class WorkerResponseDto {
  @ApiProperty({ description: 'Worker ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Worker name', example: 'Jane Smith' })
  name: string;

  @ApiPropertyOptional({
    description: 'Country where the worker is located',
    enum: Country,
    example: Country.AUSTRALIA,
  })
  country?: Country;

  @ApiPropertyOptional({
    description: 'Worker phone number',
    example: '+61412345678',
  })
  phoneNumber?: string;

  @ApiPropertyOptional({
    description: 'Worker email address',
    example: 'jane.smith@example.com',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'Preferred currency for payments',
    enum: Currency,
    example: Currency.PKR,
  })
  currency?: Currency;

  @ApiPropertyOptional({
    description: 'ID of the associated institute',
    example: 1,
  })
  instituteId?: number;

  @ApiPropertyOptional({
    description: 'Associated institute details',
    example: { id: 1, name: 'University of Melbourne' },
  })
  institute?: {
    id: number;
    name: string;
  };

  @ApiPropertyOptional({
    description: 'Additional metadata as JSON',
    example: { experience: '5 years', education: 'Masters Degree' },
  })
  metadata?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Worker specialties/skills',
    isArray: true,
    example: ['FINANCE', 'ANALYSIS'],
  })
  specialties?: string[];

  static example(): WorkerResponseDto {
    return {
      id: 1,
      name: 'Jane Smith',
      country: Country.AUSTRALIA,
      phoneNumber: '+61412345678',
      email: 'jane.smith@example.com',
      currency: Currency.PKR,
      instituteId: 1,
      institute: {
        id: 1,
        name: 'University of Melbourne',
      },
      metadata: { experience: '5 years', education: 'Masters Degree' },
      specialties: ['FINANCE', 'ANALYSIS'],
    };
  }
}
