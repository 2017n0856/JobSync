import { API_ENDPOINTS } from '../../../shared/constants/api'
import { apiClient } from '../../../shared/utils/apiClient'

export interface Worker {
  id: number
  name: string
  email: string
  phoneNumber?: string
  country?: string
  skills?: string[]
  hourlyRate?: number
  metadata?: Record<string, any>
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
  email?: string
  country?: string
  skills?: string[]
  page?: number
  limit?: number
}

export interface CreateWorkerData {
  name: string
  email: string
  phoneNumber?: string
  country?: string
  skills?: string[]
  hourlyRate?: number
  metadata?: Record<string, any>
}

export interface UpdateWorkerData {
  name?: string
  email?: string
  phoneNumber?: string
  country?: string
  skills?: string[]
  hourlyRate?: number
  metadata?: Record<string, any>
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