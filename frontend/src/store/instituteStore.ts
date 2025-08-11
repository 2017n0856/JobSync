import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Institute, InstituteListResponse, InstituteFilters } from '../types/institute'
import { instituteService } from '../services/instituteService'

interface InstituteState {
  institutes: Institute[]
  currentInstitute: Institute | null
  total: number
  page: number
  limit: number
  
  isLoading: boolean
  isLoadingDetail: boolean
  
  error: string | null
  
  fetchInstitutes: (filters?: InstituteFilters) => Promise<void>
  fetchInstituteById: (id: number) => Promise<void>
  createInstitute: (data: any) => Promise<void>
  updateInstitute: (id: number, data: any) => Promise<void>
  deleteInstitute: (id: number) => Promise<void>
  clearError: () => void
  clearCurrentInstitute: () => void
}

export const useInstituteStore = create<InstituteState>()(
  devtools(
    (set, get) => ({
      institutes: [],
      currentInstitute: null,
      total: 0,
      page: 1,
      limit: 10,
      isLoading: false,
      isLoadingDetail: false,
      error: null,

      fetchInstitutes: async (filters: InstituteFilters = {}) => {
        set({ isLoading: true, error: null })
        try {
          const response = await instituteService.getInstitutes(filters)
          set({
            institutes: response.institutes,
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
              error: error instanceof Error ? error.message : 'Failed to fetch institutes',
              isLoading: false,
            })
            throw error
          }
        }
      },

      fetchInstituteById: async (id: number) => {
        set({ isLoadingDetail: true, error: null })
        try {
          const institute = await instituteService.getInstituteById(id)
          set({
            currentInstitute: institute,
            isLoadingDetail: false,
          })
        } catch (error) {
          const status = (error as any)?.status
          if (status && [401, 403, 404, 409, 500].includes(status)) {
            set({ isLoadingDetail: false })
            throw error
          } else {
            set({
              error: error instanceof Error ? error.message : 'Failed to fetch institute details',
              isLoadingDetail: false,
            })
            throw error
          }
        }
      },

      createInstitute: async (data: any) => {
        set({ isLoading: true, error: null })
        try {
          const newInstitute = await instituteService.createInstitute(data)
          
          const institutes = [newInstitute, ...get().institutes]
          
          set({
            institutes,
            isLoading: false,
          })
        } catch (error) {
          const status = (error as any)?.status
          if (status && [401, 403, 404, 409, 500].includes(status)) {
            set({ isLoading: false })
            throw error
          } else {
            set({
              error: error instanceof Error ? error.message : 'Failed to create institute',
              isLoading: false,
            })
            throw error
          }
        }
      },

      updateInstitute: async (id: number, data: any) => {
        set({ isLoading: true, error: null })
        try {
          const updatedInstitute = await instituteService.updateInstitute(id, data)
          
          const institutes = get().institutes.map(inst =>
            inst.id === id ? updatedInstitute : inst
          )
          
          const currentInstitute = get().currentInstitute
          const newCurrentInstitute = currentInstitute?.id === id ? updatedInstitute : currentInstitute
          
          set({
            institutes,
            currentInstitute: newCurrentInstitute,
            isLoading: false,
          })
        } catch (error) {
          const status = (error as any)?.status
          if (status && [401, 403, 404, 409, 500].includes(status)) {
            set({ isLoading: false })
            throw error
          } else {
            set({
              error: error instanceof Error ? error.message : 'Failed to update institute',
              isLoading: false,
            })
            throw error
          }
        }
      },

      deleteInstitute: async (id: number) => {
        set({ isLoading: true, error: null })
        try {
          await instituteService.deleteInstitute(id)
          
          const institutes = get().institutes.filter(inst => inst.id !== id)
          
          const currentInstitute = get().currentInstitute
          const newCurrentInstitute = currentInstitute?.id === id ? null : currentInstitute
          
          set({
            institutes,
            currentInstitute: newCurrentInstitute,
            isLoading: false,
          })
        } catch (error) {
          const status = (error as any)?.status
          if (status && [401, 403, 404, 409, 500].includes(status)) {
            set({ isLoading: false })
            throw error
          } else {
            set({
              error: error instanceof Error ? error.message : 'Failed to delete institute',
              isLoading: false,
            })
            throw error
          }
        }
      },

      clearError: () => set({ error: null }),
      clearCurrentInstitute: () => set({ currentInstitute: null }),
    }),
    {
      name: 'institute-store',
    }
  )
) 