import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Card, 
  Typography, 
  Button, 
  Table, 
  Input,
  message
} from 'antd'
import { 
  PlusOutlined, 
  SearchOutlined
} from '@ant-design/icons'
import styled from 'styled-components'
import { useInstituteStore } from '../../../app/store/instituteStore'
import { Institute, InstituteFilters } from '../../../shared/types/institute'
import CreateInstituteModal from './CreateInstituteModal'

const { Title, Text } = Typography

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

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function InstitutesPage() {
  const navigate = useNavigate()
  
  const {
    institutes,
    total,
    page,
    limit,
    isLoading,
    error,
    fetchInstitutes,
    clearError
  } = useInstituteStore()

  const [filters, setFilters] = useState<InstituteFilters>({
    page: 1,
    limit: 10,
  })
  
  const [nameSearchValue, setNameSearchValue] = useState('')
  const [countrySearchValue, setCountrySearchValue] = useState('')
  const [createModalVisible, setCreateModalVisible] = useState(false)
  
  const debouncedNameSearch = useDebounce(nameSearchValue, 800)
  const debouncedCountrySearch = useDebounce(countrySearchValue, 800)

  const pagination = {
    current: page,
    pageSize: limit,
    total: total,
  }

  useEffect(() => {
    const newFilters = {
      ...filters,
      name: debouncedNameSearch || undefined,
      country: debouncedCountrySearch || undefined,
      page: 1,
    }
    setFilters(newFilters)
  }, [debouncedNameSearch, debouncedCountrySearch])

  useEffect(() => {
    fetchInstitutes(filters)
  }, [fetchInstitutes, filters.page, filters.limit, filters.name, filters.country])

  useEffect(() => {
    return () => {
      clearError()
    }
  }, [clearError])

  useEffect(() => {
    if (error) {
      message.error('Failed to load institutes')
    }
  }, [error])

  const handleNameSearchChange = (value: string) => {
    setNameSearchValue(value)
  }

  const handleCountrySearchChange = (value: string) => {
    setCountrySearchValue(value)
  }

  const handleTableChange = (pagination: any) => {
    const newFilters = { 
      ...filters, 
      page: pagination.current,
      limit: pagination.pageSize 
    }
    setFilters(newFilters)
  }

  const handleInstituteClick = (id: number) => {
    navigate(`/institutes/${id}`)
  }

  const handleCreateInstitute = () => {
    setCreateModalVisible(true)
  }

  const handleCreateSuccess = () => {
    setFilters({ ...filters })
  }

  const columns = [
    {
      title: '#',
      key: 'serial',
      width: 60,
      render: (_: any, __: Institute, index: number) => {
        const currentPage = pagination.current
        const pageSize = pagination.pageSize
        return (
          <Typography.Text>
            {((currentPage - 1) * pageSize) + index + 1}
          </Typography.Text>
        )
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: Institute) => (
        <Button 
          type="link" 
          onClick={() => handleInstituteClick(record.id)}
          style={{ padding: 0, height: 'auto', fontWeight: 'bold' }}
        >
          {name}
        </Button>
      ),
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      render: (country: string) => (
        <Typography.Text>
          {country || '-'}
        </Typography.Text>
      ),
    },
  ]

  return (
    <div>
      <PageHeader>
        <div>
          <Title level={2}>Institutes</Title>
          <Text type="secondary">
            Manage educational and training institutes.
          </Text>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          size="large"
          onClick={handleCreateInstitute}
        >
          Add Institute
        </Button>
      </PageHeader>

      <FilterSection>
        <FilterRow>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 4 }}>
              Filter by Name
            </Text>
            <Input
              placeholder="Search institutes by name..."
              allowClear
              onChange={(e) => handleNameSearchChange(e.target.value)}
              style={{ width: 250 }}
              prefix={<SearchOutlined />}
            />
          </div>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 4 }}>
              Filter by Country
            </Text>
            <Input
              placeholder="Search institutes by country..."
              allowClear
              onChange={(e) => handleCountrySearchChange(e.target.value)}
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
          loading={isLoading}
          bordered
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} institutes`,
          }}
          onChange={handleTableChange}
          scroll={{ x: 600 }}
        />
      </Card>

      <CreateInstituteModal
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  )
} 