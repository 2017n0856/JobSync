import { useAuthStore } from '../store/authStore'
import { notificationService } from './notification'

let lastErrorNotification: string | null = null
let lastErrorTime: number = 0

export const handleApiError = (error: any, currentPath?: string, operation?: string) => {
  console.error('API Error:', error)

  if (error.status === 409) {
    return
  }

  const errorId = `${error.status || 'unknown'}-${error.message || 'unknown'}`
  const currentTime = Date.now()
  
  if (lastErrorNotification === errorId && currentTime - lastErrorTime < 2000) {
    return
  }
  
  lastErrorNotification = errorId
  lastErrorTime = currentTime

  if (operation === 'PUT' || operation === 'DELETE') {
    return
  }

  if (error.message?.includes('401') || error.status === 401) {
    const logout = useAuthStore.getState().logout
    logout()
    
    const path = currentPath || window.location.pathname
    const searchParams = window.location.search
    const fullPath = path + searchParams
    
    if (fullPath !== '/login' && fullPath !== '/signup') {
      window.location.href = `/login?redirect=${encodeURIComponent(fullPath)}`
    } else {
      window.location.href = '/login'
    }
    return
  }

  if (error.message?.includes('403') || error.status === 403) {
    notificationService.error({
      message: 'Access Denied',
      description: 'You do not have permission to perform this action.'
    })
    return
  }

  if (error.message?.includes('404') || error.status === 404) {
    notificationService.error({
      message: 'Not Found',
      description: 'The requested resource was not found.'
    })
    return
  }

  if (error.message?.includes('500') || error.status === 500) {
    notificationService.error({
      message: 'Server Error',
      description: 'Server error. Please try again later.'
    })
    return
  }

  notificationService.error({
    message: 'Error',
    description: error.message || 'An unexpected error occurred. Please try again.'
  })
}

export const isAuthError = (error: any): boolean => {
  return error.message?.includes('401') || 
         error.message?.includes('unauthorized') || 
         error.status === 401
} 