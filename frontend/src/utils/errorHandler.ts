import { useAuthStore } from '../store/authStore'

export const handleApiError = (error: any, currentPath?: string) => {
  console.error('API Error:', error)

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
    alert('Access denied. You do not have permission to perform this action.')
    return
  }

  if (error.message?.includes('404') || error.status === 404) {
    alert('Resource not found.')
    return
  }

  if (error.message?.includes('500') || error.status === 500) {
    alert('Server error. Please try again later.')
    return
  }

  alert(error.message || 'An unexpected error occurred. Please try again.')
}

export const isAuthError = (error: any): boolean => {
  return error.message?.includes('401') || 
         error.message?.includes('unauthorized') || 
         error.status === 401
} 