import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Institute, InstituteListResponse, InstituteFilters } from '../types/institute'
import { instituteService } from '../services/instituteService'

interface InstituteState {
  // Data
  institutes: Institute[]
  currentInstitute: Institute | null
  total: number
  page: number
  limit: number
  
  // Loading states
  isLoading: boolean
  isLoadingDetail: boolean
  
  // Error states
  error: string | null
  
  // Actions
  fetchInstitutes: (filters?: InstituteFilters) => Promise<void>
  fetchInstituteById: (id: number) => Promise<void>
  updateInstitute: (id: number, data: any) => Promise<void>
  deleteInstitute: (id: number) => Promise<void>
  clearError: () => void
  clearCurrentInstitute: () => void
}

export const useInstituteStore = create<InstituteState>()(
  devtools(
    (set, get) => ({
      // Initial state
      institutes: [],
      currentInstitute: null,
      total: 0,
      page: 1,
      limit: 10,
      isLoading: false,
      isLoadingDetail: false,
      error: null,

      // Actions
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
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch institutes',
            isLoading: false,
          })
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
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch institute details',
            isLoadingDetail: false,
          })
        }
      },

      updateInstitute: async (id: number, data: any) => {
        set({ isLoading: true, error: null })
        try {
          const updatedInstitute = await instituteService.updateInstitute(id, data)
          
          // Update in institutes list
          const institutes = get().institutes.map(inst =>
            inst.id === id ? updatedInstitute : inst
          )
          
          // Update current institute if it's the one being updated
          const currentInstitute = get().currentInstitute
          const newCurrentInstitute = currentInstitute?.id === id ? updatedInstitute : currentInstitute
          
          set({
            institutes,
            currentInstitute: newCurrentInstitute,
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to update institute',
            isLoading: false,
          })
        }
      },

      deleteInstitute: async (id: number) => {
        set({ isLoading: true, error: null })
        try {
          await instituteService.deleteInstitute(id)
          
          // Remove from institutes list
          const institutes = get().institutes.filter(inst => inst.id !== id)
          
          // Clear current institute if it's the one being deleted
          const currentInstitute = get().currentInstitute
          const newCurrentInstitute = currentInstitute?.id === id ? null : currentInstitute
          
          set({
            institutes,
            currentInstitute: newCurrentInstitute,
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to delete institute',
            isLoading: false,
          })
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