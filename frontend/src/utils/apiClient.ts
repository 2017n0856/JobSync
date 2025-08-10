import { tokenManager } from './tokenManager'
import { handleApiError } from './errorHandler'
import { formatQueryParams } from './queryParams'

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private getHeaders(): Record<string, string> {
    const token = tokenManager.getToken()
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  private async makeRequest(
    endpoint: string,
    options: RequestInit = {},
    params?: Record<string, any>
  ): Promise<any> {
    let url = `${this.baseURL}${endpoint}`
    
    if (params) {
      const formattedParams = formatQueryParams(params)
      const searchParams = new URLSearchParams()
      Object.keys(formattedParams).forEach(key => {
        searchParams.append(key, formattedParams[key].toString())
      })
      url += `?${searchParams.toString()}`
    }

    const config: RequestInit = {
      headers: this.getHeaders(),
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'An error occurred' }))
        const error = new Error(errorData.message || `HTTP error! status: ${response.status}`)
        ;(error as any).status = response.status
        
        handleApiError(error)
        throw error
      }

      return response.json()
    } catch (error) {
      if (error instanceof Error) {
        handleApiError(error)
      }
      throw error
    }
  }

  async get(endpoint: string, params?: Record<string, any>): Promise<any> {
    return this.makeRequest(endpoint, { method: 'GET' }, params)
  }

  async post(endpoint: string, data?: any): Promise<any> {
    return this.makeRequest(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put(endpoint: string, data?: any): Promise<any> {
    return this.makeRequest(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete(endpoint: string): Promise<any> {
    return this.makeRequest(endpoint, { method: 'DELETE' })
  }

  async patch(endpoint: string, data?: any): Promise<any> {
    return this.makeRequest(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }
}

export const apiClient = new ApiClient(import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000') 