import { getApiUrl, API_ENDPOINTS } from '../constants/api'
import { Institute, InstituteListResponse, InstituteFilters } from '../types/institute'
import { useAuthStore } from '../store/authStore'

const getAuthHeaders = () => {
  const token = useAuthStore.getState().token
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

export const instituteService = {
  async getInstitutes(filters: InstituteFilters = {}): Promise<InstituteListResponse> {
    const params = new URLSearchParams()
    
    if (filters.name) params.append('name', filters.name)
    if (filters.country) params.append('country', filters.country)
    if (filters.page) params.append('page', filters.page.toString())
    if (filters.limit) params.append('limit', filters.limit.toString())

    const url = `${getApiUrl(API_ENDPOINTS.INSTITUTES.BASE)}?${params.toString()}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch institutes')
    }

    return response.json()
  },

  async getInstituteById(id: number): Promise<Institute> {
    const url = getApiUrl(`${API_ENDPOINTS.INSTITUTES.BASE}/${id}`)
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch institute')
    }

    return response.json()
  },
} 