import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { tokenManager } from '../../shared/utils/tokenManager'

interface User {
  id: string
  email: string
  name: string
  username: string
  phoneNumber?: string
  role: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  redirectUrl: string | null
  login: (user: User, token: string, redirectUrl?: string) => void
  logout: () => void
  setRedirectUrl: (url: string) => void
  clearRedirectUrl: () => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      redirectUrl: null,
      login: (user: User, token: string, redirectUrl?: string) => {
        tokenManager.setToken(token)
        tokenManager.setUser(user)
        set({ user, token, isAuthenticated: true, redirectUrl: redirectUrl || null })
      },
      logout: () => {
        tokenManager.clearAll()
        set({ user: null, token: null, isAuthenticated: false, redirectUrl: null })
      },
      setRedirectUrl: (url: string) => set({ redirectUrl: url }),
      clearRedirectUrl: () => set({ redirectUrl: null }),
    }),
    {
      name: 'auth-store',
    }
  )
) 