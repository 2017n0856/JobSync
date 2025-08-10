import { API_ENDPOINTS } from '../constants/api'
import { Institute, InstituteListResponse, InstituteFilters } from '../types/institute'
import { apiClient } from '../utils/apiClient'

export const instituteService = {
  async getInstitutes(filters: InstituteFilters = {}): Promise<InstituteListResponse> {
    return apiClient.get(API_ENDPOINTS.INSTITUTES.BASE, filters)
  },

  async getInstituteById(id: number): Promise<Institute> {
    return apiClient.get(`${API_ENDPOINTS.INSTITUTES.BASE}/${id}`)
  },
} 