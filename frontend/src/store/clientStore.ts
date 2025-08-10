import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { clientService, Client, ClientListResponse, ClientFilters, CreateClientData, UpdateClientData } from '../services/clientService'

interface ClientState {
  // Data
  clients: Client[]
  currentClient: Client | null
  total: number
  page: number
  limit: number
  
  // Loading states
  isLoading: boolean
  isLoadingDetail: boolean
  
  // Error states
  error: string | null
  
  // Actions
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
      // Initial state
      clients: [],
      currentClient: null,
      total: 0,
      page: 1,
      limit: 10,
      isLoading: false,
      isLoadingDetail: false,
      error: null,

      // Actions
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
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch clients',
            isLoading: false,
          })
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
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch client details',
            isLoadingDetail: false,
          })
        }
      },

      createClient: async (data: CreateClientData) => {
        set({ isLoading: true, error: null })
        try {
          const newClient = await clientService.createClient(data)
          const clients = [...get().clients, newClient]
          set({
            clients,
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to create client',
            isLoading: false,
          })
        }
      },

      updateClient: async (id: number, data: UpdateClientData) => {
        set({ isLoading: true, error: null })
        try {
          const updatedClient = await clientService.updateClient(id, data)
          
          // Update in clients list
          const clients = get().clients.map(client =>
            client.id === id ? updatedClient : client
          )
          
          // Update current client if it's the one being updated
          const currentClient = get().currentClient
          const newCurrentClient = currentClient?.id === id ? updatedClient : currentClient
          
          set({
            clients,
            currentClient: newCurrentClient,
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to update client',
            isLoading: false,
          })
        }
      },

      deleteClient: async (id: number) => {
        set({ isLoading: true, error: null })
        try {
          await clientService.deleteClient(id)
          
          // Remove from clients list
          const clients = get().clients.filter(client => client.id !== id)
          
          // Clear current client if it's the one being deleted
          const currentClient = get().currentClient
          const newCurrentClient = currentClient?.id === id ? null : currentClient
          
          set({
            clients,
            currentClient: newCurrentClient,
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to delete client',
            isLoading: false,
          })
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