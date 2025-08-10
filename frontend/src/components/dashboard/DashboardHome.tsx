import { Row, Col, Card, Statistic, Typography, Button, Timeline, Space } from 'antd'
import { 
  UserOutlined, 
  TeamOutlined, 
  FileTextOutlined, 
  BankOutlined
} from '@ant-design/icons'
import styled from 'styled-components'

const { Title, Text } = Typography

const StyledCard = styled(Card)`
  margin-bottom: 24px;
`

const StatCard = styled(Card)`
  .ant-statistic-title {
    color: #8c8c8c;
    font-size: 14px;
  }
  .ant-statistic-content {
    color: #262626;
  }
`

const stats = [
  { title: 'Total Clients', value: 12, icon: <UserOutlined />, color: '#1890ff' },
  { title: 'Active Workers', value: 24, icon: <TeamOutlined />, color: '#52c41a' },
  { title: 'Pending Tasks', value: 8, icon: <FileTextOutlined />, color: '#faad14' },
  { title: 'Institutes', value: 6, icon: <BankOutlined />, color: '#722ed1' },
]

const recentActivities = [
  {
    color: '#52c41a',
    children: (
      <div>
        <Text strong>New worker John Doe joined</Text>
        <br />
        <Text type="secondary">3 hours ago</Text>
      </div>
    ),
  },
  {
    color: '#1890ff',
    children: (
      <div>
        <Text strong>Task "Website Development" completed</Text>
        <br />
        <Text type="secondary">1 day ago</Text>
      </div>
    ),
  },
]

const quickActions = [
  { label: 'Add Client', icon: <UserOutlined /> },
  { label: 'Add Worker', icon: <TeamOutlined /> },
  { label: 'Create Task', icon: <FileTextOutlined /> },
  { label: 'Add Institute', icon: <BankOutlined /> },
]

export default function DashboardHome() {
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <Title level={2}>Dashboard</Title>
        <Text type="secondary">
          Welcome back! Here's an overview of your JobSync platform.
        </Text>
      </div>

      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <StatCard>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: stat.color }}
              />
            </StatCard>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <StyledCard title="Recent Activity">
            <Timeline items={recentActivities} />
          </StyledCard>
        </Col>

        <Col xs={24} lg={12}>
          <StyledCard title="Quick Actions">
            <Space direction="vertical" style={{ width: '100%' }}>
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  type="primary"
                  icon={action.icon}
                  block
                  style={{ textAlign: 'left', height: 'auto', padding: '12px 16px' }}
                >
                  {action.label}
                </Button>
              ))}
            </Space>
          </StyledCard>
        </Col>
      </Row>
    </div>
  )
} 