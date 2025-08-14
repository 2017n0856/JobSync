import { useAuthStore } from '../../app/store/authStore'

class TokenManager {
  private readonly TOKEN_KEY = 'jobsync_access_token'
  private readonly USER_KEY = 'jobsync_user'

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token)
    sessionStorage.setItem(this.TOKEN_KEY, token)
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY)
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY)
    sessionStorage.removeItem(this.TOKEN_KEY)
  }

  setUser(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user))
  }

  getUser(): any | null {
    const userStr = localStorage.getItem(this.USER_KEY) || sessionStorage.getItem(this.USER_KEY)
    return userStr ? JSON.parse(userStr) : null
  }

  removeUser(): void {
    localStorage.removeItem(this.USER_KEY)
    sessionStorage.removeItem(this.USER_KEY)
  }

  isTokenValid(): boolean {
    const token = this.getToken()
    if (!token) return false

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Date.now() / 1000
      return payload.exp > currentTime
    } catch (error) {
      return false
    }
  }

  getTokenExpiration(): Date | null {
    const token = this.getToken()
    if (!token) return null

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return new Date(payload.exp * 1000)
    } catch (error) {
      return null
    }
  }

  isTokenExpiringSoon(minutes: number = 5): boolean {
    const expiration = this.getTokenExpiration()
    if (!expiration) return true

    const currentTime = new Date()
    const timeUntilExpiration = expiration.getTime() - currentTime.getTime()
    const minutesUntilExpiration = timeUntilExpiration / (1000 * 60)

    return minutesUntilExpiration <= minutes
  }

  clearAll(): void {
    this.removeToken()
    this.removeUser()
  }

  initializeFromStorage(): void {
    const token = this.getToken()
    const user = this.getUser()
    
    if (token && user && this.isTokenValid()) {
      useAuthStore.getState().login(user, token)
    }
  }
}

export const tokenManager = new TokenManager() 