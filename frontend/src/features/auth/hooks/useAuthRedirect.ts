import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../../app/store/authStore'

export const useAuthRedirect = () => {
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const redirectUrl = useAuthStore((state) => state.redirectUrl)
  const clearRedirectUrl = useAuthStore((state) => state.clearRedirectUrl)

  useEffect(() => {
    if (isAuthenticated && redirectUrl) {
      clearRedirectUrl()
      navigate(redirectUrl)
    }
  }, [isAuthenticated, redirectUrl, navigate, clearRedirectUrl])
} 