import { Row, Col, Card, Typography, Progress, Statistic } from 'antd'
import { BarChartOutlined, RiseOutlined, FallOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const { Title, Text } = Typography

const StyledCard = styled(Card)`
  margin-bottom: 24px;
`

const TrendItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const TrendInfo = styled.div`
  display: flex;
  align-items: center;
`

export default function StatsPage() {
  const trends = [
    { label: 'Client Growth', value: '+12%', color: '#52c41a', icon: <RiseOutlined /> },
    { label: 'Task Completion', value: '+8%', color: '#52c41a', icon: <RiseOutlined /> },
    { label: 'Worker Turnover', value: '-3%', color: '#ff4d4f', icon: <FallOutlined /> },
  ]

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <Title level={2}>Statistics</Title>
        <Text type="secondary">
          View detailed analytics and performance metrics.
        </Text>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <StyledCard title="Performance Overview">
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <BarChartOutlined style={{ fontSize: 64, color: '#d9d9d9', marginBottom: 16 }} />
              <div>
                <Text type="secondary">No data available</Text>
                <br />
                <Text type="secondary">Statistics will appear here once you have data.</Text>
              </div>
            </div>
          </StyledCard>
        </Col>

        <Col xs={24} lg={12}>
          <StyledCard title="Recent Trends">
            {trends.map((trend, index) => (
              <TrendItem key={index}>
                <TrendInfo>
                  <span style={{ color: trend.color, marginRight: 8 }}>
                    {trend.icon}
                  </span>
                  <Text>{trend.label}</Text>
                </TrendInfo>
                <Text style={{ color: trend.color, fontWeight: 500 }}>
                  {trend.value}
                </Text>
              </TrendItem>
            ))}
          </StyledCard>
        </Col>
      </Row>
    </div>
  )
} 