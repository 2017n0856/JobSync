import { useState, useEffect } from 'react'
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
import { useClientStore } from '../../../app/store/clientStore'
import { Client, ClientFilters, Country } from '../../../shared/types/client'
import { notificationService } from '../../../shared/utils/notification'
import CreateClientModal from './CreateClientModal'

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

export default function ClientsPage() {
  const navigate = useNavigate()
  
  const {
    clients,
    total,
    page,
    limit,
    isLoading,
    error,
    fetchClients,
    clearError
  } = useClientStore()

  const [filters, setFilters] = useState<ClientFilters>({
    page: 1,
    limit: 10,
  })
  
  const [nameSearchValue, setNameSearchValue] = useState('')
  const [countrySearchValue, setCountrySearchValue] = useState('')
  const [instituteSearchValue, setInstituteSearchValue] = useState('')
  const [createModalVisible, setCreateModalVisible] = useState(false)
  
  const debouncedNameSearch = useDebounce(nameSearchValue, 800)
  const debouncedCountrySearch = useDebounce(countrySearchValue, 800)
  const debouncedInstituteSearch = useDebounce(instituteSearchValue, 800)

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
      instituteName: debouncedInstituteSearch || undefined,
      page: 1,
    }
    setFilters(newFilters)
  }, [debouncedNameSearch, debouncedCountrySearch, debouncedInstituteSearch])

  useEffect(() => {
    fetchClients(filters)
  }, [fetchClients, filters.page, filters.limit, filters.name, filters.country, filters.instituteName])

  useEffect(() => {
    return () => {
      clearError()
    }
  }, [clearError])

  useEffect(() => {
    if (error) {
      notificationService.apiError('Failed to load clients', error)
    }
  }, [error])

  const handleNameSearchChange = (value: string) => {
    setNameSearchValue(value)
  }

  const handleCountrySearchChange = (value: string) => {
    setCountrySearchValue(value)
  }

  const handleInstituteSearchChange = (value: string) => {
    setInstituteSearchValue(value)
  }

  const handleTableChange = (pagination: any) => {
    const newFilters = { 
      ...filters, 
      page: pagination.current,
      limit: pagination.pageSize 
    }
    setFilters(newFilters)
  }

  const handleClientClick = (id: number) => {
    navigate(`/clients/${id}`)
  }

  const handleCreateClient = () => {
    setCreateModalVisible(true)
  }

  const handleCreateSuccess = () => {
    fetchClients(filters)
  }

  const columns = [
    {
      title: '#',
      key: 'serial',
      width: 60,
      render: (_: any, __: Client, index: number) => {
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
      render: (name: string, record: Client) => (
        <Button 
          type="link" 
          onClick={() => handleClientClick(record.id)}
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
      render: (country: Country) => (
        <Typography.Text>
          {country || '-'}
        </Typography.Text>
      ),
    },
    {
      title: 'Institute',
      dataIndex: 'institute',
      key: 'institute',
      render: (institute: { id: number; name: string }) => (
        <Typography.Text>
          {institute?.name || '-'}
        </Typography.Text>
      ),
    },
  ]

  return (
    <div>
      <PageHeader>
        <div>
          <Title level={2}>Clients</Title>
          <Text type="secondary">
            Manage your client relationships and information.
          </Text>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          size="large"
          onClick={handleCreateClient}
        >
          Add Client
        </Button>
      </PageHeader>

      <FilterSection>
        <FilterRow>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 4 }}>
              Filter by Name
            </Text>
            <Input
              placeholder="Search clients by name..."
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
              placeholder="Search clients by country..."
              allowClear
              onChange={(e) => handleCountrySearchChange(e.target.value)}
              style={{ width: 250 }}
              prefix={<SearchOutlined />}
            />
          </div>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 4 }}>
              Filter by Institute
            </Text>
            <Input
              placeholder="Search clients by institute..."
              allowClear
              onChange={(e) => handleInstituteSearchChange(e.target.value)}
              style={{ width: 250 }}
              prefix={<SearchOutlined />}
            />
          </div>
        </FilterRow>
      </FilterSection>

      <Card>
        <Table
          columns={columns}
          dataSource={clients}
          rowKey="id"
          loading={isLoading}
          bordered
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} clients`,
          }}
          onChange={handleTableChange}
          scroll={{ x: 800 }}
        />
      </Card>

      <CreateClientModal
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  )
} 