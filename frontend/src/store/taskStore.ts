import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { taskService, Task, TaskListResponse, TaskFilters, CreateTaskData, UpdateTaskData } from '../services/taskService'

interface TaskState {
  // Data
  tasks: Task[]
  currentTask: Task | null
  total: number
  page: number
  limit: number
  
  // Loading states
  isLoading: boolean
  isLoadingDetail: boolean
  
  // Error states
  error: string | null
  
  // Actions
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
      // Initial state
      tasks: [],
      currentTask: null,
      total: 0,
      page: 1,
      limit: 10,
      isLoading: false,
      isLoadingDetail: false,
      error: null,

      // Actions
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
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch tasks',
            isLoading: false,
          })
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
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch task details',
            isLoadingDetail: false,
          })
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
          set({
            error: error instanceof Error ? error.message : 'Failed to create task',
            isLoading: false,
          })
        }
      },

      updateTask: async (id: number, data: UpdateTaskData) => {
        set({ isLoading: true, error: null })
        try {
          const updatedTask = await taskService.updateTask(id, data)
          
          // Update in tasks list
          const tasks = get().tasks.map(task =>
            task.id === id ? updatedTask : task
          )
          
          // Update current task if it's the one being updated
          const currentTask = get().currentTask
          const newCurrentTask = currentTask?.id === id ? updatedTask : currentTask
          
          set({
            tasks,
            currentTask: newCurrentTask,
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to update task',
            isLoading: false,
          })
        }
      },

      deleteTask: async (id: number) => {
        set({ isLoading: true, error: null })
        try {
          await taskService.deleteTask(id)
          
          // Remove from tasks list
          const tasks = get().tasks.filter(task => task.id !== id)
          
          // Clear current task if it's the one being deleted
          const currentTask = get().currentTask
          const newCurrentTask = currentTask?.id === id ? null : currentTask
          
          set({
            tasks,
            currentTask: newCurrentTask,
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to delete task',
            isLoading: false,
          })
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