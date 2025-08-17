import { API_ENDPOINTS } from '../../../shared/constants/api'
import { Client, ClientListResponse, ClientFilters, Country, Currency } from '../../../shared/types/client'
import { apiClient } from '../../../shared/utils/apiClient'

export interface CreateClientData {
  name: string
  country?: Country
  phoneNumber?: string
  email?: string
  currency?: Currency
  instituteId?: number
  metadata?: string
}

export interface UpdateClientData {
  name?: string
  country?: Country
  phoneNumber?: string
  email?: string
  currency?: Currency
  instituteId?: number
  metadata?: string
}

export const clientService = {
  async getClients(filters: ClientFilters = {}): Promise<ClientListResponse> {
    return apiClient.get(API_ENDPOINTS.CLIENTS.BASE, filters)
  },

  async getClientById(id: number): Promise<Client> {
    return apiClient.get(`${API_ENDPOINTS.CLIENTS.BASE}/${id}`)
  },

  async createClient(data: CreateClientData): Promise<Client> {
    return apiClient.post(API_ENDPOINTS.CLIENTS.BASE, data)
  },

  async updateClient(id: number, data: UpdateClientData): Promise<Client> {
    return apiClient.put(`${API_ENDPOINTS.CLIENTS.BASE}/${id}`, data)
  },

  async deleteClient(id: number): Promise<void> {
    return apiClient.delete(`${API_ENDPOINTS.CLIENTS.BASE}/${id}`)
  },
} 