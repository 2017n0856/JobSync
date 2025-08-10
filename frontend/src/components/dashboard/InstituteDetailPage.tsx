import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Typography, Button, Descriptions, Spin, Alert, Tag } from 'antd'
import { ArrowLeftOutlined, BankOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { instituteService } from '../../services/instituteService'
import { Institute } from '../../types/institute'

const { Title, Text } = Typography

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`

const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 24px;
  }
`

const MetadataSection = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
`

export default function InstituteDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [institute, setInstitute] = useState<Institute | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInstitute = async () => {
      if (!id) return
      
      try {
        setLoading(true)
        const data = await instituteService.getInstituteById(parseInt(id))
        setInstitute(data)
      } catch (err) {
        setError('Failed to load institute details')
      } finally {
        setLoading(false)
      }
    }

    fetchInstitute()
  }, [id])

  const handleBack = () => {
    navigate('/institutes')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <PageHeader>
          <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
            Back to Institutes
          </Button>
        </PageHeader>
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      </div>
    )
  }

  if (!institute) {
    return (
      <div>
        <PageHeader>
          <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
            Back to Institutes
          </Button>
        </PageHeader>
        <Alert
          message="Not Found"
          description="Institute not found"
          type="warning"
          showIcon
        />
      </div>
    )
  }

  return (
    <div>
      <PageHeader>
        <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
          Back to Institutes
        </Button>
        <Title level={2} style={{ margin: 0 }}>
          <BankOutlined style={{ marginRight: 8 }} />
          {institute.name}
        </Title>
      </PageHeader>

      <StyledCard>
        <Descriptions
          title="Institute Information"
          bordered
          column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label="ID">
            <Tag color="blue">{institute.id}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Name">
            <Text strong>{institute.name}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Country">
            {institute.country ? (
              <Tag color="green">{institute.country}</Tag>
            ) : (
              <Text type="secondary">Not specified</Text>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Created">
            {formatDate(institute.createdAt)}
          </Descriptions.Item>
          <Descriptions.Item label="Last Updated">
            {formatDate(institute.updatedAt)}
          </Descriptions.Item>
        </Descriptions>

        {institute.metadata && Object.keys(institute.metadata).length > 0 && (
          <MetadataSection>
            <Title level={4}>Additional Information</Title>
            <Descriptions bordered column={1}>
              {Object.entries(institute.metadata).map(([key, value]) => (
                <Descriptions.Item key={key} label={key.charAt(0).toUpperCase() + key.slice(1)}>
                  {typeof value === 'object' ? (
                    <pre style={{ margin: 0, fontSize: '12px' }}>
                      {JSON.stringify(value, null, 2)}
                    </pre>
                  ) : (
                    <Text>{String(value)}</Text>
                  )}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </MetadataSection>
        )}
      </StyledCard>
    </div>
  )
} 