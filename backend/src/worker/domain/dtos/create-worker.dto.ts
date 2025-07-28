import { IsEmail, IsOptional, IsString, IsEnum, IsJSON, IsNumber, IsArray } from 'class-validator';
import { Country } from '../../../common/enums/country.enum';
import { Specialty } from '../../../common/enums/specialty.enum';
import { IsPhoneNumber } from '../../../common/validators/phone.validator';

export class CreateWorkerDto {
  @IsString()
  name: string;

  @IsEnum(Country)
  country: Country;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNumber()
  @IsOptional()
  instituteId?: number;

  @IsJSON()
  @IsOptional()
  metadata?: Record<string, any>;

  @IsArray()
  @IsEnum(Specialty, { each: true })
  @IsOptional()
  specialties?: Specialty[];
} 