import { API_ENDPOINTS } from '../constants/api'
import { Institute, InstituteListResponse, InstituteFilters } from '../types/institute'
import { apiClient } from '../utils/apiClient'

export interface UpdateInstituteData {
  name?: string
  country?: string
  metadata?: Record<string, any> // Object for API
}

export interface CreateInstituteData {
  name: string
  country?: string
  metadata?: Record<string, any>
}

export const instituteService = {
  async getInstitutes(filters: InstituteFilters = {}): Promise<InstituteListResponse> {
    return apiClient.get(API_ENDPOINTS.INSTITUTES.BASE, filters)
  },

  async getInstituteById(id: number): Promise<Institute> {
    return apiClient.get(`${API_ENDPOINTS.INSTITUTES.BASE}/${id}`)
  },

  async createInstitute(data: CreateInstituteData): Promise<Institute> {
    return apiClient.post(API_ENDPOINTS.INSTITUTES.BASE, data)
  },

  async updateInstitute(id: number, data: UpdateInstituteData): Promise<Institute> {
    return apiClient.put(`${API_ENDPOINTS.INSTITUTES.BASE}/${id}`, data)
  },

  async deleteInstitute(id: number): Promise<void> {
    return apiClient.delete(`${API_ENDPOINTS.INSTITUTES.BASE}/${id}`)
  },
} 