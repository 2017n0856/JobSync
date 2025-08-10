// Export all stores
export { useAuthStore } from './authStore'
export { useInstituteStore } from './instituteStore'
export { useClientStore } from './clientStore'
export { useWorkerStore } from './workerStore'
export { useTaskStore } from './taskStore'

// Export types for convenience
export type { Institute, InstituteListResponse, InstituteFilters } from '../types/institute'
export type { Client, ClientListResponse, ClientFilters, CreateClientData, UpdateClientData } from '../services/clientService'
export type { Worker, WorkerListResponse, WorkerFilters, CreateWorkerData, UpdateWorkerData } from '../services/workerService'
export type { Task, TaskListResponse, TaskFilters, CreateTaskData, UpdateTaskData } from '../services/taskService' 