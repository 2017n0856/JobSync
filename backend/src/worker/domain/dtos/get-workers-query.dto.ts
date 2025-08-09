import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';

export class GetWorkerQueryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  instituteName?: string;

  @IsString()
  @IsOptional()
  specialty?: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  page?: number = 1;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}
