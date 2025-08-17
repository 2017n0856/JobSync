import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Card, 
  Typography, 
  Button, 
  Table, 
  Input,
  Tag
} from 'antd'
import { 
  PlusOutlined, 
  SearchOutlined
} from '@ant-design/icons'
import styled from 'styled-components'
import { useWorkerStore } from '../../../app/store/workerStore'
import { Worker, WorkerFilters, Country, Currency } from '../../../shared/types/worker'
import { notificationService } from '../../../shared/utils/notification'
import CreateWorkerModal from './CreateWorkerModal'

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

export default function WorkersPage() {
  const navigate = useNavigate()
  
  const {
    workers,
    total,
    page,
    limit,
    isLoading,
    error,
    fetchWorkers,
    clearError
  } = useWorkerStore()

  const [filters, setFilters] = useState<WorkerFilters>({
    page: 1,
    limit: 10,
  })
  
  const [nameSearchValue, setNameSearchValue] = useState('')
  const [countrySearchValue, setCountrySearchValue] = useState('')
  const [instituteSearchValue, setInstituteSearchValue] = useState('')
  const [specialtySearchValue, setSpecialtySearchValue] = useState('')
  const [createModalVisible, setCreateModalVisible] = useState(false)
  
  const debouncedNameSearch = useDebounce(nameSearchValue, 800)
  const debouncedCountrySearch = useDebounce(countrySearchValue, 800)
  const debouncedInstituteSearch = useDebounce(instituteSearchValue, 800)
  const debouncedSpecialtySearch = useDebounce(specialtySearchValue, 800)

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
      specialty: debouncedSpecialtySearch || undefined,
      page: 1,
    }
    setFilters(newFilters)
  }, [debouncedNameSearch, debouncedCountrySearch, debouncedInstituteSearch, debouncedSpecialtySearch])

  useEffect(() => {
    fetchWorkers(filters)
  }, [fetchWorkers, filters.page, filters.limit, filters.name, filters.country, filters.instituteName, filters.specialty])

  useEffect(() => {
    return () => {
      clearError()
    }
  }, [clearError])

  useEffect(() => {
    if (error) {
      notificationService.apiError('Failed to load workers', error)
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

  const handleSpecialtySearchChange = (value: string) => {
    setSpecialtySearchValue(value)
  }

  const handleTableChange = (pagination: any) => {
    const newFilters = { 
      ...filters, 
      page: pagination.current,
      limit: pagination.pageSize 
    }
    setFilters(newFilters)
  }

  const handleWorkerClick = (id: number) => {
    navigate(`/workers/${id}`)
  }

  const handleCreateWorker = () => {
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
      render: (_: any, __: Worker, index: number) => {
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
      render: (name: string, record: Worker) => (
        <Button 
          type="link" 
          onClick={() => handleWorkerClick(record.id)}
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
    {
      title: 'Specialties',
      dataIndex: 'specialties',
      key: 'specialties',
      render: (specialties: string[]) => (
        <div>
          {specialties && specialties.length > 0 ? (
            specialties.slice(0, 4).map((specialty, index) => (
              <Tag key={index} color="blue" style={{ marginBottom: 4 }}>
                {specialty}
              </Tag>
            ))
          ) : (
            <Typography.Text type="secondary">-</Typography.Text>
          )}
          {specialties && specialties.length > 4 && (
            <Tag color="default">+{specialties.length - 4} more</Tag>
          )}
        </div>
      ),
    },
  ]

  return (
    <div>
      <PageHeader>
        <div>
          <Title level={2}>Workers</Title>
          <Text type="secondary">
            Manage your workforce and their assignments.
          </Text>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          size="large"
          onClick={handleCreateWorker}
        >
          Add Worker
        </Button>
      </PageHeader>

      <FilterSection>
        <FilterRow>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 4 }}>
              Filter by Name
            </Text>
            <Input
              placeholder="Search workers by name..."
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
              placeholder="Search workers by country..."
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
              placeholder="Search workers by institute..."
              allowClear
              onChange={(e) => handleInstituteSearchChange(e.target.value)}
              style={{ width: 250 }}
              prefix={<SearchOutlined />}
            />
          </div>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 4 }}>
              Filter by Specialty
            </Text>
            <Input
              placeholder="Search workers by specialty..."
              allowClear
              onChange={(e) => handleSpecialtySearchChange(e.target.value)}
              style={{ width: 250 }}
              prefix={<SearchOutlined />}
            />
          </div>
        </FilterRow>
      </FilterSection>

      <Card>
        <Table
          columns={columns}
          dataSource={workers}
          rowKey="id"
          loading={isLoading}
          bordered
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} workers`,
          }}
          onChange={handleTableChange}
        />
      </Card>

      <CreateWorkerModal
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  )
} 