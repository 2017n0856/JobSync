import { API_ENDPOINTS } from '../../../shared/constants/api'
import { Worker, WorkerListResponse, WorkerFilters, Country, Currency } from '../../../shared/types/worker'
import { apiClient } from '../../../shared/utils/apiClient'

export interface CreateWorkerData {
  name: string
  country?: Country
  phoneNumber?: string
  email?: string
  currency?: Currency
  instituteId?: number
  metadata?: Record<string, any>
  specialties?: string[]
}

export interface UpdateWorkerData {
  name?: string
  country?: Country
  phoneNumber?: string
  email?: string
  currency?: Currency
  instituteId?: number
  metadata?: Record<string, any>
  specialties?: string[]
}

export const workerService = {
  async getWorkers(filters: WorkerFilters = {}): Promise<WorkerListResponse> {
    return apiClient.get(API_ENDPOINTS.WORKERS.BASE, filters)
  },

  async getWorkerById(id: number): Promise<Worker> {
    return apiClient.get(`${API_ENDPOINTS.WORKERS.BASE}/${id}`)
  },

  async createWorker(data: CreateWorkerData): Promise<Worker> {
    return apiClient.post(API_ENDPOINTS.WORKERS.BASE, data)
  },

  async updateWorker(id: number, data: UpdateWorkerData): Promise<Worker> {
    return apiClient.put(`${API_ENDPOINTS.WORKERS.BASE}/${id}`, data)
  },

  async deleteWorker(id: number): Promise<void> {
    return apiClient.delete(`${API_ENDPOINTS.WORKERS.BASE}/${id}`)
  },
} 