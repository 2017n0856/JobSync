import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { taskService, Task, TaskFilters, CreateTaskData, UpdateTaskData } from '../../features/tasks/services/taskService'

interface TaskState {
  tasks: Task[]
  currentTask: Task | null
  total: number
  page: number
  limit: number
  
  isLoading: boolean
  isLoadingDetail: boolean
  
  error: string | null
  
  fetchTasks: (filters?: TaskFilters) => Promise<void>
  fetchTaskById: (id: number) => Promise<void>
  createTask: (data: CreateTaskData) => Promise<void>
  updateTask: (id: number, data: UpdateTaskData) => Promise<void>
  deleteTask: (id: number) => Promise<void>
  clearError: () => void
  clearCurrentTask: () => void
}

export const useTaskStore = create<TaskState>()(
  devtools(
    (set, get) => ({
      tasks: [],
      currentTask: null,
      total: 0,
      page: 1,
      limit: 10,
      isLoading: false,
      isLoadingDetail: false,
      error: null,

      fetchTasks: async (filters: TaskFilters = {}) => {
        set({ isLoading: true, error: null })
        try {
          const response = await taskService.getTasks(filters)
          set({
            tasks: response.tasks,
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
              error: error instanceof Error ? error.message : 'Failed to fetch tasks',
              isLoading: false,
            })
            throw error
          }
        }
      },

      fetchTaskById: async (id: number) => {
        set({ isLoadingDetail: true, error: null })
        try {
          const task = await taskService.getTaskById(id)
          set({
            currentTask: task,
            isLoadingDetail: false,
          })
        } catch (error) {
          const status = (error as any)?.status
          if (status && [401, 403, 404, 500].includes(status)) {
            set({ isLoadingDetail: false })
            throw error
          } else {
            set({
              error: error instanceof Error ? error.message : 'Failed to fetch task details',
              isLoadingDetail: false,
            })
            throw error
          }
        }
      },

      createTask: async (data: CreateTaskData) => {
        set({ isLoading: true, error: null })
        try {
          const newTask = await taskService.createTask(data)
          const tasks = [...get().tasks, newTask]
          set({
            tasks,
            isLoading: false,
          })
        } catch (error) {
          const status = (error as any)?.status
          if (status && [401, 403, 404, 500].includes(status)) {
            set({ isLoading: false })
            throw error
          } else {
            set({
              error: error instanceof Error ? error.message : 'Failed to create task',
              isLoading: false,
            })
            throw error
          }
        }
      },

      updateTask: async (id: number, data: UpdateTaskData) => {
        set({ isLoading: true, error: null })
        try {
          const updatedTask = await taskService.updateTask(id, data)
          
          const tasks = get().tasks.map(task =>
            task.id === id ? updatedTask : task
          )
          
          const currentTask = get().currentTask
          const newCurrentTask = currentTask?.id === id ? updatedTask : currentTask
          
          set({
            tasks,
            currentTask: newCurrentTask,
            isLoading: false,
          })
        } catch (error) {
          const status = (error as any)?.status
          if (status && [401, 403, 404, 500].includes(status)) {
            set({ isLoading: false })
            throw error
          } else {
            set({
              error: error instanceof Error ? error.message : 'Failed to update task',
              isLoading: false,
            })
            throw error
          }
        }
      },

      deleteTask: async (id: number) => {
        set({ isLoading: true, error: null })
        try {
          await taskService.deleteTask(id)
          
          const tasks = get().tasks.filter(task => task.id !== id)
          
          const currentTask = get().currentTask
          const newCurrentTask = currentTask?.id === id ? null : currentTask
          
          set({
            tasks,
            currentTask: newCurrentTask,
            isLoading: false,
          })
        } catch (error) {
          const status = (error as any)?.status
          if (status && [401, 403, 404, 500].includes(status)) {
            set({ isLoading: false })
            throw error
          } else {
            set({
              error: error instanceof Error ? error.message : 'Failed to delete task',
              isLoading: false,
            })
            throw error
          }
        }
      },

      clearError: () => set({ error: null }),
      clearCurrentTask: () => set({ currentTask: null }),
    }),
    {
      name: 'task-store',
    }
  )
) 