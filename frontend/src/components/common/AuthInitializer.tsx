import { useEffect } from 'react'
import { tokenManager } from '../../utils/tokenManager'

export default function AuthInitializer() {
  useEffect(() => {
    tokenManager.initializeFromStorage()
  }, [])

  return null
} 