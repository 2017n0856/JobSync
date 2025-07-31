import { IsEmail, IsOptional, IsString, IsEnum, IsJSON, IsNumber, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Country } from '../../../common/enums/country.enum';
import { Currency } from '../../../common/enums/currency.enum';
import { IsPhoneNumber } from '../../../common/validators/phone.validator';

export class CreateClientDto {
  @ApiProperty({ 
    description: 'Client name (must be unique)', 
    example: 'Acme Corporation',
    minLength: 2,
    maxLength: 50
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @ApiPropertyOptional({ 
    description: 'Country where the client is located', 
    enum: Country,
    example: Country.AUSTRALIA
  })
  @IsEnum(Country)
  @IsOptional()
  country?: Country;

  @ApiPropertyOptional({ 
    description: 'Client phone number', 
    example: '+61412345678'
  })
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional({ 
    description: 'Client email address', 
    example: 'contact@acme.com',
    maxLength: 50
  })
  @IsEmail()
  @IsOptional()
  @MaxLength(50)
  email?: string;

  @ApiPropertyOptional({ 
    description: 'Preferred currency for payments', 
    enum: Currency,
    example: Currency.AUD
  })
  @IsEnum(Currency)
  @IsOptional()
  currency?: Currency;

  @ApiPropertyOptional({ 
    description: 'ID of the associated institute', 
    example: 1
  })
  @IsNumber()
  @IsOptional()
  instituteId?: number;

  @ApiPropertyOptional({ 
    description: 'Additional metadata as JSON', 
    example: { industry: 'Technology', founded: 1990, employees: 500 }
  })
  @IsJSON()
  @IsOptional()
  metadata?: Record<string, any>;
} 