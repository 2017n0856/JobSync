import { Card, Typography, Button, Empty } from 'antd'
import { TeamOutlined, PlusOutlined } from '@ant-design/icons'
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

export default function WorkersPage() {
  return (
    <div>
      <PageHeader>
        <div>
          <Title level={2}>Workers</Title>
          <Text type="secondary">
            Manage your workforce and their assignments.
          </Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} size="large">
          Add Worker
        </Button>
      </PageHeader>

      <StyledCard>
        <Empty
          image={<TeamOutlined style={{ fontSize: 64, color: '#d9d9d9' }} />}
          description={
            <span>
              <Text type="secondary">No workers</Text>
              <br />
              <Text type="secondary">Get started by adding a new worker.</Text>
            </span>
          }
        >
          <Button type="primary" icon={<PlusOutlined />}>
            Add Worker
          </Button>
        </Empty>
      </StyledCard>
    </div>
  )
} 