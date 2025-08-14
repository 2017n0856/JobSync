import { useEffect, useRef } from 'react'
import { useAuthStore } from '../../../app/store/authStore'
import { tokenManager } from '../../../shared/utils/tokenManager'

export const useTokenValidation = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const logout = useAuthStore((state) => state.logout)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isAuthenticated) {
      const checkToken = () => {
        if (!tokenManager.isTokenValid()) {
          logout()
        }
      }

      checkToken()
      intervalRef.current = setInterval(checkToken, 60000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAuthenticated, logout])
} 