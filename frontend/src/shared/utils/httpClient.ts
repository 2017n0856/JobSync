import { handleApiError } from './errorHandler'
import { tokenManager } from './tokenManager'

class HttpClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private getAuthHeaders(): Record<string, string> {
    const token = tokenManager.getToken()
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  private async handleResponse(response: Response): Promise<any> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'An error occurred' }))
      const error = new Error(errorData.message || `HTTP error! status: ${response.status}`)
      ;(error as any).status = response.status
      
      handleApiError(error)
      throw error
    }

    return response.json()
  }

  async get(endpoint: string, params?: Record<string, any>): Promise<any> {
    const url = new URL(`${this.baseURL}${endpoint}`)
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key].toString())
        }
      })
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.getAuthHeaders(),
    })

    return this.handleResponse(response)
  }

  async post(endpoint: string, data?: any): Promise<any> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    })

    return this.handleResponse(response)
  }

  async put(endpoint: string, data?: any): Promise<any> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    })

    return this.handleResponse(response)
  }

  async delete(endpoint: string): Promise<any> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    })

    return this.handleResponse(response)
  }
}

export const httpClient = new HttpClient(import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000') 