export interface Institute {
  id: number
  name: string
  country?: string
  metadata?: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface InstituteListResponse {
  institutes: Institute[]
  total: number
  page: number
  limit: number
}

export interface InstituteFilters {
  name?: string
  country?: string
  page?: number
  limit?: number
} 