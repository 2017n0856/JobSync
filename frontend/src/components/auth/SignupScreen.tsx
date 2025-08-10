import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Input, Button, Card, Typography } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import styled from 'styled-components'
import { useAuthStore } from '../../store/authStore'
import { getApiUrl, API_ENDPOINTS } from '../../constants/api'
import { notificationService } from '../../utils/notification'

const { Title, Text } = Typography

const SignupContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`

const SignupCard = styled(Card)`
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

export default function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const handleSubmit = async (values: { 
    name: string; 
    email: string; 
    username: string;
    phoneNumber?: string;
    password: string; 
    confirmPassword: string 
  }) => {
    if (values.password !== values.confirmPassword) {
      notificationService.error({
        message: 'Password Mismatch',
        description: 'Passwords do not match. Please try again.'
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(getApiUrl(API_ENDPOINTS.AUTH.SIGNUP), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          username: values.username,
          phoneNumber: values.phoneNumber,
          password: values.password,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        login(data.user, data.access_token)
        navigate('/dashboard')
      } else {
        const errorData = await response.json()
        notificationService.error({
          message: 'Signup Failed',
          description: errorData.message || 'Please check your information and try again.'
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
    <SignupContainer>
      <SignupCard>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title level={2} style={{ marginBottom: 8 }}>
            Create Account
          </Title>
          <Text type="secondary">
            Join JobSync and start managing your projects
          </Text>
        </div>

        <StyledForm
          name="signup"
          onFinish={(values: any) => handleSubmit(values)}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your full name!' }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Full name"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined />}
              placeholder="Email address"
            />
          </Form.Item>

          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Please input your username!' },
              { min: 3, message: 'Username must be at least 3 characters!' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: 'Username can only contain letters, numbers, and underscores!' }
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            rules={[
              { pattern: /^\+?[1-9]\d{1,14}$/, message: 'Please enter a valid phone number!' }
            ]}
          >
            <Input
              size="large"
              prefix={<PhoneOutlined />}
              placeholder="Phone number (optional)"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('The two passwords do not match!'))
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Confirm password"
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
              Create Account
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Text type="secondary">
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#1890ff' }}>
                Sign in
              </Link>
            </Text>
          </div>
        </StyledForm>
      </SignupCard>
    </SignupContainer>
  )
} 