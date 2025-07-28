import { IsOptional, IsString, IsEnum } from 'class-validator';
import { Country } from '../../../common/enums/country.enum';

export class GetClientQueryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(Country)
  @IsOptional()
  country?: Country;

  @IsString()
  @IsOptional()
  instituteName?: string;
} 