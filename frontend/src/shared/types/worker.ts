export enum Country {
  UNITED_STATES = 'United States',
  PAKISTAN = 'Pakistan',
  INDIA = 'India',
  AUSTRALIA = 'Australia',
  CANADA = 'Canada',
  UNITED_KINGDOM = 'United Kingdom',
  POLAND = 'Poland',
  KUWAIT = 'Kuwait',
  SAUDI_ARABIA = 'Saudi Arabia',
  UNITED_ARAB_EMIRATES = 'United Arab Emirates',
  KENYA = 'Kenya',
  QATAR = 'Qatar',
}

export enum Currency {
  USD = 'USD',
  PKR = 'PKR',
  INR = 'INR',
  AUD = 'AUD',
  CAD = 'CAD',
  GBP = 'GBP',
  EUR = 'EUR',
  KWD = 'KWD',
  AED = 'AED',
}

export interface Worker {
  id: number
  name: string
  country?: Country
  phoneNumber?: string
  email?: string
  currency?: Currency
  instituteId?: number
  institute?: {
    id: number
    name: string
  }
  metadata?: Record<string, any> | string
  specialties?: string[]
  createdAt: string
  updatedAt: string
}

export interface WorkerListResponse {
  workers: Worker[]
  total: number
  page: number
  limit: number
}

export interface WorkerFilters {
  name?: string
  country?: string
  instituteName?: string
  specialty?: string
  page?: number
  limit?: number
} 