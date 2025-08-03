import { IsOptional, IsString, IsEnum, IsArray } from 'class-validator';
import { Country } from '../../../common/enums/country.enum';
import { Specialty } from '../../../common/enums/specialty.enum';

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
  @IsEnum(Specialty, { each: true })
  @IsOptional()
  specialties?: Specialty[];
}
