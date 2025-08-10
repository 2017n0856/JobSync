import { Card, Typography, Button, Empty } from 'antd'
import { BankOutlined, PlusOutlined } from '@ant-design/icons'
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

export default function InstitutesPage() {
  return (
    <div>
      <PageHeader>
        <div>
          <Title level={2}>Institutes</Title>
          <Text type="secondary">
            Manage educational and training institutes.
          </Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} size="large">
          Add Institute
        </Button>
      </PageHeader>

      <StyledCard>
        <Empty
          image={<BankOutlined style={{ fontSize: 64, color: '#d9d9d9' }} />}
          description={
            <span>
              <Text type="secondary">No institutes</Text>
              <br />
              <Text type="secondary">Get started by adding a new institute.</Text>
            </span>
          }
        >
          <Button type="primary" icon={<PlusOutlined />}>
            Add Institute
          </Button>
        </Empty>
      </StyledCard>
    </div>
  )
} 