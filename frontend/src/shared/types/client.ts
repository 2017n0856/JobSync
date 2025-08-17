import { Country, Currency } from './enums'

export interface Client {
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
  createdAt: string
  updatedAt: string
}

export interface ClientListResponse {
  clients: Client[]
  total: number
  page: number
  limit: number
}

export interface ClientFilters {
  name?: string
  country?: string
  instituteName?: string
  page?: number
  limit?: number
}

export { Country, Currency } 