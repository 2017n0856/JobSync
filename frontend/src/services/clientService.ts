import { API_ENDPOINTS } from '../constants/api'
import { apiClient } from '../utils/apiClient'

export interface Client {
  id: number
  name: string
  email: string
  phoneNumber?: string
  country?: string
  metadata?: Record<string, any>
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
  email?: string
  country?: string
  page?: number
  limit?: number
}

export interface CreateClientData {
  name: string
  email: string
  phoneNumber?: string
  country?: string
  metadata?: Record<string, any>
}

export interface UpdateClientData {
  name?: string
  email?: string
  phoneNumber?: string
  country?: string
  metadata?: Record<string, any>
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