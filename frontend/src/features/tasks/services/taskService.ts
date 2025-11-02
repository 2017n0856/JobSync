import { API_ENDPOINTS } from '../../../shared/constants/api'
import { apiClient } from '../../../shared/utils/apiClient'
import { TaskType, Currency } from '../../../shared/types/enums'

export interface Task {
  id: number
  name: string
  description?: string
  deadlineTime?: string
  deadlineDate?: string
  submittedOnDate?: string
  clientPaymentDecided: number
  clientPaymentMade: number
  workerPaymentDecided: number
  workerPaymentMade: number
  client?: {
    id: number
    name: string
    currency: Currency
  }
  worker?: {
    id: number
    name: string
    currency: Currency
  }
  taskType: TaskType
  metadata?: Record<string, any>
  createdAt?: string
  updatedAt?: string
}

export interface TaskListResponse {
  tasks: Task[]
  total: number
  page: number
  limit: number
}

export interface TaskFilters {
  name?: string
  deadlineDateFrom?: string
  deadlineDateTo?: string
  clientName?: string
  workerName?: string
  taskStatus?: 'assigned' | 'not_assigned' | 'delivered'
  clientPaymentStatus?: 'yes' | 'no'
  workerPaymentStatus?: 'yes' | 'no'
  taskType?: TaskType
  page?: number
  limit?: number
}

export interface CreateTaskData {
  title: string
  description?: string
  status?: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  priority?: 'low' | 'medium' | 'high'
  type: string
  clientId?: number
  workerId?: number
  instituteId?: number
  dueDate?: string
  estimatedHours?: number
  metadata?: Record<string, any>
}

export interface UpdateTaskData {
  title?: string
  description?: string
  status?: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  priority?: 'low' | 'medium' | 'high'
  type?: string
  clientId?: number
  workerId?: number
  instituteId?: number
  dueDate?: string
  estimatedHours?: number
  actualHours?: number
  metadata?: Record<string, any>
}

export const taskService = {
  async getTasks(filters: TaskFilters = {}): Promise<TaskListResponse> {
    return apiClient.get(API_ENDPOINTS.TASKS.BASE, filters)
  },

  async getTaskById(id: number): Promise<Task> {
    return apiClient.get(`${API_ENDPOINTS.TASKS.BASE}/${id}`)
  },

  async createTask(data: CreateTaskData): Promise<Task> {
    return apiClient.post(API_ENDPOINTS.TASKS.BASE, data)
  },

  async updateTask(id: number, data: UpdateTaskData): Promise<Task> {
    return apiClient.put(`${API_ENDPOINTS.TASKS.BASE}/${id}`, data)
  },

  async deleteTask(id: number): Promise<void> {
    return apiClient.delete(`${API_ENDPOINTS.TASKS.BASE}/${id}`)
  },
} 