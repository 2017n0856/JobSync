import { useState, useEffect } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { Form, Input, Button, Card, Typography } from 'antd'
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import styled from 'styled-components'
import { useAuthStore } from '../../store/authStore'
import { getApiUrl, API_ENDPOINTS } from '../../constants/api'
import { useAuthRedirect } from '../../hooks/useAuthRedirect'
import { notificationService } from '../../utils/notification'

const { Title, Text } = Typography

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 24px;
  }
`

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const login = useAuthStore((state) => state.login)
  const setRedirectUrl = useAuthStore((state) => state.setRedirectUrl)

  useAuthRedirect()

  useEffect(() => {
    const redirect = searchParams.get('redirect')
    if (redirect) {
      setRedirectUrl(redirect)
    }
  }, [searchParams, setRedirectUrl])

  const handleSubmit = async (values: { email: string; password: string }) => {
    setIsLoading(true)

    try {
      const response = await fetch(getApiUrl(API_ENDPOINTS.AUTH.LOGIN), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        const data = await response.json()
        login(data.user, data.accessToken)
        navigate('/dashboard')
      } else {
        const errorData = await response.json()
        notificationService.error({
          message: 'Login Failed',
          description: errorData.message || 'Please check your credentials and try again.'
        })
      }
    } catch (error) {
      notificationService.error({
        message: 'Connection Error',
        description: 'An error occurred. Please check your connection and try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LoginContainer>
      <LoginCard>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title level={2} style={{ marginBottom: 8 }}>
            Welcome Back
          </Title>
          <Text type="secondary">
            Sign in to your JobSync account
          </Text>
        </div>

        <StyledForm
          name="login"
          onFinish={(values: any) => handleSubmit(values)}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email or username!' }
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Email or username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              block
            >
              Sign In
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Text type="secondary">
              Don't have an account?{' '}
              <Link to="/signup" style={{ color: '#1890ff' }}>
                Sign up
              </Link>
            </Text>
          </div>
        </StyledForm>
      </LoginCard>
    </LoginContainer>
  )
} 