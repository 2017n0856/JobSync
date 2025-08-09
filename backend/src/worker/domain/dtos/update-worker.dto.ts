import {
  IsEmail,
  IsOptional,
  IsString,
  IsEnum,
  IsJSON,
  IsNumber,
  IsArray,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Country } from '../../../common/enums/country.enum';
import { Currency } from '../../../common/enums/currency.enum';
import { IsPhoneNumber } from '../../../common/validators/phone.validator';

export class UpdateWorkerDto {
  @ApiPropertyOptional({
    description: 'Worker name (must be unique)',
    example: 'Jane Smith',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(50)
  name?: string;

  @ApiPropertyOptional({
    description: 'Country where the worker is located',
    enum: Country,
    example: Country.AUSTRALIA,
  })
  @IsEnum(Country)
  @IsOptional()
  country?: Country;

  @ApiPropertyOptional({
    description: 'Worker phone number',
    example: '+61412345678',
  })
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional({
    description: 'Worker email address',
    example: 'jane.smith@example.com',
    maxLength: 50,
  })
  @IsEmail()
  @IsOptional()
  @MaxLength(50)
  email?: string;

  @ApiPropertyOptional({
    description: 'Preferred currency for payments',
    enum: Currency,
    example: Currency.PKR,
  })
  @IsEnum(Currency)
  @IsOptional()
  currency?: Currency;

  @ApiPropertyOptional({
    description: 'ID of the associated institute',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  instituteId?: number;

  @ApiPropertyOptional({
    description: 'Additional metadata as JSON',
    example: { experience: '5 years', education: 'Masters Degree' },
  })
  @IsJSON()
  @IsOptional()
  metadata?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Worker specialties/skills',
    isArray: true,
    example: ['FINANCE', 'ANALYSIS'],
  })
  @IsArray()
  @IsOptional()
  specialties?: string[];
}
