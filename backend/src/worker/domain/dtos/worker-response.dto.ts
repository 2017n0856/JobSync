import { Country } from '../../../common/enums/country.enum';
import { Currency } from '../../../common/enums/currency.enum';
import { Specialty } from '../../../common/enums/specialty.enum';

export class WorkerResponseDto {
  id: number;
  name: string;
  country: Country;
  phoneNumber?: string;
  email?: string;
  currency?: Currency;
  instituteId?: number;
  institute?: {
    id: number;
    name: string;
  };
  metadata?: Record<string, any>;
  specialties?: Specialty[];
} 