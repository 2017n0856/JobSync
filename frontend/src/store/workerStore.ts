import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { workerService, Worker, WorkerListResponse, WorkerFilters, CreateWorkerData, UpdateWorkerData } from '../services/workerService'

interface WorkerState {
  workers: Worker[]
  currentWorker: Worker | null
  total: number
  page: number
  limit: number
  
  isLoading: boolean
  isLoadingDetail: boolean
  
  error: string | null
  
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
      workers: [],
      currentWorker: null,
      total: 0,
      page: 1,
      limit: 10,
      isLoading: false,
      isLoadingDetail: false,
      error: null,

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
          const status = (error as any)?.status
          if (status && [401, 403, 404, 409, 500].includes(status)) {
            set({ isLoading: false })
            throw error
          } else {
            set({
              error: error instanceof Error ? error.message : 'Failed to fetch workers',
              isLoading: false,
            })
            throw error
          }
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
          const status = (error as any)?.status
          if (status && [401, 403, 404, 500].includes(status)) {
            set({ isLoadingDetail: false })
            throw error
          } else {
            set({
              error: error instanceof Error ? error.message : 'Failed to fetch worker details',
              isLoadingDetail: false,
            })
            throw error
          }
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
          const status = (error as any)?.status
          if (status && [401, 403, 404, 500].includes(status)) {
            set({ isLoading: false })
            throw error
          } else {
            set({
              error: error instanceof Error ? error.message : 'Failed to create worker',
              isLoading: false,
            })
            throw error
          }
        }
      },

      updateWorker: async (id: number, data: UpdateWorkerData) => {
        set({ isLoading: true, error: null })
        try {
          const updatedWorker = await workerService.updateWorker(id, data)
          
          const workers = get().workers.map(worker =>
            worker.id === id ? updatedWorker : worker
          )
          
          const currentWorker = get().currentWorker
          const newCurrentWorker = currentWorker?.id === id ? updatedWorker : currentWorker
          
          set({
            workers,
            currentWorker: newCurrentWorker,
            isLoading: false,
          })
        } catch (error) {
          const status = (error as any)?.status
          if (status && [401, 403, 404, 500].includes(status)) {
            set({ isLoading: false })
            throw error
          } else {
            set({
              error: error instanceof Error ? error.message : 'Failed to update worker',
              isLoading: false,
            })
            throw error
          }
        }
      },

      deleteWorker: async (id: number) => {
        set({ isLoading: true, error: null })
        try {
          await workerService.deleteWorker(id)
          
          const workers = get().workers.filter(worker => worker.id !== id)
          
          const currentWorker = get().currentWorker
          const newCurrentWorker = currentWorker?.id === id ? null : currentWorker
          
          set({
            workers,
            currentWorker: newCurrentWorker,
            isLoading: false,
          })
        } catch (error) {
          const status = (error as any)?.status
          if (status && [401, 403, 404, 500].includes(status)) {
            set({ isLoading: false })
            throw error
          } else {
            set({
              error: error instanceof Error ? error.message : 'Failed to delete worker',
              isLoading: false,
            })
            throw error
          }
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