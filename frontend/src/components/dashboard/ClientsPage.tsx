import { Card, Typography, Button, Empty } from 'antd'
import { UserOutlined, PlusOutlined } from '@ant-design/icons'
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

export default function ClientsPage() {
  return (
    <div>
      <PageHeader>
        <div>
          <Title level={2}>Clients</Title>
          <Text type="secondary">
            Manage your client relationships and information.
          </Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} size="large">
          Add Client
        </Button>
      </PageHeader>

      <StyledCard>
        <Empty
          image={<UserOutlined style={{ fontSize: 64, color: '#d9d9d9' }} />}
          description={
            <span>
              <Text type="secondary">No clients</Text>
              <br />
              <Text type="secondary">Get started by creating a new client.</Text>
            </span>
          }
        >
          <Button type="primary" icon={<PlusOutlined />}>
            Add Client
          </Button>
        </Empty>
      </StyledCard>
    </div>
  )
} 