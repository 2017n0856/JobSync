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
    BASE: '/clients',
  },
  WORKERS: {
    BASE: '/workers',
  },
  TASKS: {
    BASE: '/tasks',
  },
  INSTITUTES: {
    BASE: '/institutes',
  },
} as const

export const getApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`
} 