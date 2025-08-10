import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { workerService, Worker, WorkerListResponse, WorkerFilters, CreateWorkerData, UpdateWorkerData } from '../services/workerService'

interface WorkerState {
  // Data
  workers: Worker[]
  currentWorker: Worker | null
  total: number
  page: number
  limit: number
  
  // Loading states
  isLoading: boolean
  isLoadingDetail: boolean
  
  // Error states
  error: string | null
  
  // Actions
  fetchWorkers: (filters?: WorkerFilters) => Promise<void>
  fetchWorkerById: (id: number) => Promise<void>
  createWorker: (data: CreateWorkerData) => Promise<void>
  updateWorker: (id: number, data: UpdateWorkerData) => Promise<void>
  deleteWorker: (id: number) => Promise<void>
  clearError: () => void
  clearCurrentWorker: () => void
}

export const useWorkerStore = create<WorkerState>()(
  devtools(
    (set, get) => ({
      // Initial state
      workers: [],
      currentWorker: null,
      total: 0,
      page: 1,
      limit: 10,
      isLoading: false,
      isLoadingDetail: false,
      error: null,

      // Actions
      fetchWorkers: async (filters: WorkerFilters = {}) => {
        set({ isLoading: true, error: null })
        try {
          const response = await workerService.getWorkers(filters)
          set({
            workers: response.workers,
            total: response.total,
            page: response.page,
            limit: response.limit,
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch workers',
            isLoading: false,
          })
        }
      },

      fetchWorkerById: async (id: number) => {
        set({ isLoadingDetail: true, error: null })
        try {
          const worker = await workerService.getWorkerById(id)
          set({
            currentWorker: worker,
            isLoadingDetail: false,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch worker details',
            isLoadingDetail: false,
          })
        }
      },

      createWorker: async (data: CreateWorkerData) => {
        set({ isLoading: true, error: null })
        try {
          const newWorker = await workerService.createWorker(data)
          const workers = [...get().workers, newWorker]
          set({
            workers,
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to create worker',
            isLoading: false,
          })
        }
      },

      updateWorker: async (id: number, data: UpdateWorkerData) => {
        set({ isLoading: true, error: null })
        try {
          const updatedWorker = await workerService.updateWorker(id, data)
          
          // Update in workers list
          const workers = get().workers.map(worker =>
            worker.id === id ? updatedWorker : worker
          )
          
          // Update current worker if it's the one being updated
          const currentWorker = get().currentWorker
          const newCurrentWorker = currentWorker?.id === id ? updatedWorker : currentWorker
          
          set({
            workers,
            currentWorker: newCurrentWorker,
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to update worker',
            isLoading: false,
          })
        }
      },

      deleteWorker: async (id: number) => {
        set({ isLoading: true, error: null })
        try {
          await workerService.deleteWorker(id)
          
          // Remove from workers list
          const workers = get().workers.filter(worker => worker.id !== id)
          
          // Clear current worker if it's the one being deleted
          const currentWorker = get().currentWorker
          const newCurrentWorker = currentWorker?.id === id ? null : currentWorker
          
          set({
            workers,
            currentWorker: newCurrentWorker,
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to delete worker',
            isLoading: false,
          })
        }
      },

      clearError: () => set({ error: null }),
      clearCurrentWorker: () => set({ currentWorker: null }),
    }),
    {
      name: 'worker-store',
    }
  )
) 