import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Card, 
  Typography, 
  Button, 
  Table, 
  Input, 
  Alert,
  Tag,
  Tooltip
} from 'antd'
import { 
  PlusOutlined, 
  SearchOutlined,
  EyeOutlined 
} from '@ant-design/icons'
import styled from 'styled-components'
import { instituteService } from '../../services/instituteService'
import { Institute, InstituteFilters } from '../../types/institute'

const { Title, Text } = Typography
const { Search } = Input

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`

const FilterSection = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  background: #fafafa;
  border-radius: 6px;
`

const FilterRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`

export default function InstitutesPage() {
  const navigate = useNavigate()
  const [institutes, setInstitutes] = useState<Institute[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<InstituteFilters>({
    page: 1,
    limit: 10,
  })
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })

  const fetchInstitutes = async (filterParams: InstituteFilters = filters) => {
    try {
      setLoading(true)
      const response = await instituteService.getInstitutes(filterParams)
      setInstitutes(response.institutes)
      setPagination({
        current: response.page,
        pageSize: response.limit,
        total: response.total,
      })
    } catch (err) {
      setError('Failed to load institutes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInstitutes()
  }, [])

  const handleNameFilter = (value: string) => {
    const newFilters = { ...filters, name: value || undefined, page: 1 }
    setFilters(newFilters)
    fetchInstitutes(newFilters)
  }

  const handleCountryFilter = (value: string) => {
    const newFilters = { ...filters, country: value || undefined, page: 1 }
    setFilters(newFilters)
    fetchInstitutes(newFilters)
  }

  const handleTableChange = (pagination: any) => {
    const newFilters = { 
      ...filters, 
      page: pagination.current,
      limit: pagination.pageSize 
    }
    setFilters(newFilters)
    fetchInstitutes(newFilters)
  }

  const handleInstituteClick = (id: number) => {
    navigate(`/institutes/${id}`)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (id: number) => <Tag color="blue">{id}</Tag>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: Institute) => (
        <Button 
          type="link" 
          onClick={() => handleInstituteClick(record.id)}
          style={{ padding: 0, height: 'auto' }}
        >
          {name}
        </Button>
      ),
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      render: (country: string) => 
        country ? <Tag color="green">{country}</Tag> : <Text type="secondary">-</Text>,
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (record: Institute) => (
        <Tooltip title="View Details">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleInstituteClick(record.id)}
          />
        </Tooltip>
      ),
    },
  ]

  if (error) {
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
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      </div>
    )
  }

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

      <FilterSection>
        <FilterRow>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 4 }}>
              Filter by Name
            </Text>
            <Search
              placeholder="Search institutes by name..."
              allowClear
              onSearch={handleNameFilter}
              style={{ width: 250 }}
              prefix={<SearchOutlined />}
            />
          </div>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 4 }}>
              Filter by Country
            </Text>
            <Search
              placeholder="Search institutes by country..."
              allowClear
              onSearch={handleCountryFilter}
              style={{ width: 250 }}
              prefix={<SearchOutlined />}
            />
          </div>
        </FilterRow>
      </FilterSection>

      <Card>
        <Table
          columns={columns}
          dataSource={institutes}
          rowKey="id"
          loading={loading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} institutes`,
          }}
          onChange={handleTableChange}
          scroll={{ x: 800 }}
        />
      </Card>
    </div>
  )
} 