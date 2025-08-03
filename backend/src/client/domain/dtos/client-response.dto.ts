import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Country } from '../../../common/enums/country.enum';
import { Currency } from '../../../common/enums/currency.enum';

export class ClientResponseDto {
  @ApiProperty({ description: 'Client ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Client name', example: 'Acme Corporation' })
  name: string;

  @ApiPropertyOptional({
    description: 'Country where the client is located',
    enum: Country,
    example: Country.AUSTRALIA,
  })
  country?: Country;

  @ApiPropertyOptional({
    description: 'Client phone number',
    example: '+61412345678',
  })
  phoneNumber?: string;

  @ApiPropertyOptional({
    description: 'Client email address',
    example: 'contact@acme.com',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'Preferred currency for payments',
    enum: Currency,
    example: Currency.AUD,
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
    example: { industry: 'Technology', founded: 1990, employees: 500 },
  })
  metadata?: Record<string, any>;

  static example(): ClientResponseDto {
    return {
      id: 1,
      name: 'Acme Corporation',
      country: Country.AUSTRALIA,
      phoneNumber: '+61412345678',
      email: 'contact@acme.com',
      currency: Currency.AUD,
      instituteId: 1,
      institute: {
        id: 1,
        name: 'University of Melbourne',
      },
      metadata: { industry: 'Technology', founded: 1990, employees: 500 },
    };
  }
}
