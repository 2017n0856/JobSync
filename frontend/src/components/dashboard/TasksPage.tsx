import { Card, Typography, Button, Empty } from 'antd'
import { FileTextOutlined, PlusOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const { Title, Text } = Typography

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`

const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 48px;
  }
`

export default function TasksPage() {
  return (
    <div>
      <PageHeader>
        <div>
          <Title level={2}>Tasks</Title>
          <Text type="secondary">
            Manage and track all your project tasks.
          </Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} size="large">
          Create Task
        </Button>
      </PageHeader>

      <StyledCard>
        <Empty
          image={<FileTextOutlined style={{ fontSize: 64, color: '#d9d9d9' }} />}
          description={
            <span>
              <Text type="secondary">No tasks</Text>
              <br />
              <Text type="secondary">Get started by creating a new task.</Text>
            </span>
          }
        >
          <Button type="primary" icon={<PlusOutlined />}>
            Create Task
          </Button>
        </Empty>
      </StyledCard>
    </div>
  )
} 