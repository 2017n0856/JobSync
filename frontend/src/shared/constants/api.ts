export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
  },
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
  },
  CLIENTS: {
    BASE: '/client',
  },
  WORKERS: {
    BASE: '/worker',
  },
  TASKS: {
    BASE: '/task',
  },
  INSTITUTES: {
    BASE: '/institute',
  },
} as const

export const getApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`
} 