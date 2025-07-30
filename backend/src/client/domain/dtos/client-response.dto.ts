import { Country } from '../../../common/enums/country.enum';
import { Currency } from '../../../common/enums/currency.enum';

export class ClientResponseDto {
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
} 