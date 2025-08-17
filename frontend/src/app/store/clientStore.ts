import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Client, ClientFilters } from '../../shared/types/client'
import { clientService, CreateClientData, UpdateClientData } from '../../features/clients/services/clientService'

interface ClientState {
  clients: Client[]
  currentClient: Client | null
  total: number
  page: number
  limit: number
  
  isLoading: boolean
  isLoadingDetail: boolean
  
  error: string | null
  
  fetchClients: (filters?: ClientFilters) => Promise<void>
  fetchClientById: (id: number) => Promise<void>
  createClient: (data: CreateClientData) => Promise<void>
  updateClient: (id: number, data: UpdateClientData) => Promise<void>
  deleteClient: (id: number) => Promise<void>
  clearError: () => void
  clearCurrentClient: () => void
}

export const useClientStore = create<ClientState>()(
  devtools(
    (set, get) => ({
      clients: [],
      currentClient: null,
      total: 0,
      page: 1,
      limit: 10,
      isLoading: false,
      isLoadingDetail: false,
      error: null,

      fetchClients: async (filters: ClientFilters = {}) => {
        set({ isLoading: true, error: null })
        try {
          const response = await clientService.getClients(filters)
          set({
            clients: response.clients,
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
              error: error instanceof Error ? error.message : 'Failed to fetch clients',
              isLoading: false,
            })
            throw error
          }
        }
      },

      fetchClientById: async (id: number) => {
        set({ isLoadingDetail: true, error: null })
        try {
          const client = await clientService.getClientById(id)
          set({
            currentClient: client,
            isLoadingDetail: false,
          })
        } catch (error) {
          const status = (error as any)?.status
          if (status && [401, 403, 404, 500].includes(status)) {
            set({ isLoadingDetail: false })
            throw error
          } else {
            set({
              error: error instanceof Error ? error.message : 'Failed to fetch client details',
              isLoadingDetail: false,
            })
            throw error
          }
        }
      },

      createClient: async (data: CreateClientData) => {
        set({ isLoading: true, error: null })
        try {
          await clientService.createClient(data)
          set({
            isLoading: false,
          })
        } catch (error) {
          const status = (error as any)?.status
          if (status && [401, 403, 404, 500].includes(status)) {
            set({ isLoading: false })
            throw error
          } else {
            set({
              error: error instanceof Error ? error.message : 'Failed to create client',
              isLoading: false,
            })
            throw error
          }
        }
      },

      updateClient: async (id: number, data: UpdateClientData) => {
        set({ isLoading: true, error: null })
        try {
          const updatedClient = await clientService.updateClient(id, data)
          
          const clients = get().clients.map(client =>
            client.id === id ? updatedClient : client
          )
          
          const currentClient = get().currentClient
          const newCurrentClient = currentClient?.id === id ? updatedClient : currentClient
          
          set({
            clients,
            currentClient: newCurrentClient,
            isLoading: false,
          })
        } catch (error) {
          const status = (error as any)?.status
          if (status && [401, 403, 404, 500].includes(status)) {
            set({ isLoading: false })
            throw error
          } else {
            set({
              error: error instanceof Error ? error.message : 'Failed to update client',
              isLoading: false,
            })
            throw error
          }
        }
      },

      deleteClient: async (id: number) => {
        set({ isLoading: true, error: null })
        try {
          await clientService.deleteClient(id)
          
          const clients = get().clients.filter(client => client.id !== id)
          
          const currentClient = get().currentClient
          const newCurrentClient = currentClient?.id === id ? null : currentClient
          
          set({
            clients,
            currentClient: newCurrentClient,
            isLoading: false,
          })
        } catch (error) {
          const status = (error as any)?.status
          if (status && [401, 403, 404, 500].includes(status)) {
            set({ isLoading: false })
            throw error
          } else {
            set({
              error: error instanceof Error ? error.message : 'Failed to delete client',
              isLoading: false,
            })
            throw error
          }
        }
      },

      clearError: () => set({ error: null }),
      clearCurrentClient: () => set({ currentClient: null }),
    }),
    {
      name: 'client-store',
    }
  )
) 