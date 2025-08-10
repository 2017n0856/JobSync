import { Component, ErrorInfo, ReactNode } from 'react'
import { Result, Button } from 'antd'
import { useAuthStore } from '../../store/authStore'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props & { logout: () => void }, State> {
  constructor(props: Props & { logout: () => void }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    
    if (error.message.includes('401') || error.message.includes('unauthorized')) {
      this.props.logout()
      window.location.href = '/login'
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title="Something went wrong"
          subTitle="An unexpected error occurred. Please try refreshing the page."
          extra={[
            <Button type="primary" key="refresh" onClick={() => window.location.reload()}>
              Refresh Page
            </Button>,
            <Button key="home" onClick={() => window.location.href = '/dashboard'}>
              Go to Dashboard
            </Button>,
          ]}
        />
      )
    }

    return this.props.children
  }
}

export default function ErrorBoundaryWrapper({ children }: Props) {
  const logout = useAuthStore((state) => state.logout)
  
  return (
    <ErrorBoundary logout={logout}>
      {children}
    </ErrorBoundary>
  )
} 