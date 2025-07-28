import { Country } from '../../../common/enums/country.enum';

export class ClientResponseDto {
  id: number;
  name: string;
  country: Country;
  phoneNumber: string;
  email?: string;
  instituteId?: number;
  institute?: {
    id: number;
    name: string;
  };
  metadata?: Record<string, any>;
} 