import { IsEmail, IsOptional, IsString, IsEnum, IsJSON, IsNumber } from 'class-validator';
import { Country } from '../../../common/enums/country.enum';
import { Currency } from '../../../common/enums/currency.enum';
import { IsPhoneNumber } from '../../../common/validators/phone.validator';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsEnum(Country)
  country: Country;

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsEnum(Currency)
  @IsOptional()
  currency?: Currency;

  @IsNumber()
  @IsOptional()
  instituteId?: number;

  @IsJSON()
  @IsOptional()
  metadata?: Record<string, any>;
} 