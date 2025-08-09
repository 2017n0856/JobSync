import { IsOptional, IsString, IsEnum, IsArray } from 'class-validator';
import { Country } from '../../../common/enums/country.enum';

export class GetWorkerQueryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(Country)
  @IsOptional()
  country?: Country;

  @IsString()
  @IsOptional()
  instituteName?: string;

  @IsArray()
  @IsOptional()
  specialties?: string[];
}
