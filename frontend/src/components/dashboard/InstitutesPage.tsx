import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Card, 
  Typography, 
  Button, 
  Table, 
  Input
} from 'antd'
import { 
  PlusOutlined, 
  SearchOutlined
} from '@ant-design/icons'
import styled from 'styled-components'
import { useInstituteStore } from '../../store'
import { Institute, InstituteFilters } from '../../types/institute'
import { notificationService } from '../../utils/notification'

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

// Debounce hook for search
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
  
  // Zustand store state
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

  // Local state for UI interactions
  const [filters, setFilters] = useState<InstituteFilters>({
    page: 1,
    limit: 10,
  })
  
  // Search input values
  const [nameSearchValue, setNameSearchValue] = useState('')
  const [countrySearchValue, setCountrySearchValue] = useState('')
  
  // Debounced search values
  const debouncedNameSearch = useDebounce(nameSearchValue, 800)
  const debouncedCountrySearch = useDebounce(countrySearchValue, 800)

  // Pagination state derived from store
  const pagination = {
    current: page,
    pageSize: limit,
    total: total,
  }

  // Fetch institutes when debounced search values change
  useEffect(() => {
    const newFilters = {
      ...filters,
      name: debouncedNameSearch || undefined,
      country: debouncedCountrySearch || undefined,
      page: 1, // Reset to first page when searching
    }
    setFilters(newFilters)
    fetchInstitutes(newFilters)
  }, [debouncedNameSearch, debouncedCountrySearch])

  // Fetch institutes only if not already loaded or if filters changed
  useEffect(() => {
    if (institutes.length === 0 || filters.page !== page || filters.limit !== limit) {
      fetchInstitutes(filters)
    }
  }, [filters, fetchInstitutes, institutes.length, page, limit])

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      clearError()
    }
  }, [clearError])

  // Show error notification instead of Alert component
  useEffect(() => {
    if (error) {
      notificationService.apiError('Failed to load institutes', error)
    }
  }, [error])

  const handleNameSearchChange = (value: string) => {
    setNameSearchValue(value)
    
    // If field is cleared, immediately trigger search
    if (!value) {
      const newFilters = {
        ...filters,
        name: undefined,
        page: 1,
      }
      setFilters(newFilters)
      fetchInstitutes(newFilters)
    }
  }

  const handleCountrySearchChange = (value: string) => {
    setCountrySearchValue(value)
    
    // If field is cleared, immediately trigger search
    if (!value) {
      const newFilters = {
        ...filters,
        country: undefined,
        page: 1,
      }
      setFilters(newFilters)
      fetchInstitutes(newFilters)
    }
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
          scroll={{ x: 800 }}
        />
      </Card>
    </div>
  )
} 