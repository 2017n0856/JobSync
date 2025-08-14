import { useState, useEffect } from 'react'
import { Card, Typography, Button, Table, Input, Tag, Space } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useClientStore } from '../../../app/store/clientStore'
import { notificationService } from '../../../shared/utils/notification'

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

export default function ClientsPage() {
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

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  })

  const pagination = {
    current: page,
    pageSize: limit,
    total: total,
  }

  useEffect(() => {
    if (clients.length === 0) {
      fetchClients(filters)
    }
  }, [clients.length, fetchClients, filters])

  useEffect(() => {
    if (error) {
      notificationService.apiError('Failed to load clients', error)
    }
  }, [error])

  useEffect(() => {
    return () => {
      clearError()
    }
  }, [clearError])

  const handleNameFilter = (value: string) => {
    const newFilters = { ...filters, name: value || undefined, page: 1 }
    setFilters(newFilters)
    fetchClients(newFilters)
  }

  const handleTableChange = (pagination: any) => {
    const newFilters = { 
      ...filters, 
      page: pagination.current,
      limit: pagination.pageSize 
    }
    setFilters(newFilters)
    fetchClients(newFilters)
  }

  const columns = [
    {
      title: '#',
      key: 'serial',
      width: 60,
      render: (_: any, __: any, index: number) => {
        const currentPage = pagination.current
        const pageSize = pagination.pageSize
        return <Tag color="blue">{((currentPage - 1) * pageSize) + index + 1}</Tag>
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <Text strong>{name}</Text>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => (
        <Text copyable>{email}</Text>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: (phone: string) => (
        phone ? <Text copyable>{phone}</Text> : <Text type="secondary">Not provided</Text>
      ),
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      render: (country: string) => (
        country ? <Tag color="green">{country}</Tag> : <Text type="secondary">Not specified</Text>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => (
        <Text type="secondary">
          {new Date(date).toLocaleDateString()}
        </Text>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_: any) => (
        <Space>
          <Button type="link" size="small">
            View
          </Button>
          <Button type="link" size="small">
            Edit
          </Button>
        </Space>
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
        <Button type="primary" icon={<PlusOutlined />} size="large">
          Add Client
        </Button>
      </PageHeader>

      <FilterSection>
        <Input.Search
          placeholder="Search by name..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={handleNameFilter}
          style={{ maxWidth: 400 }}
        />
      </FilterSection>

      <Card>
        <Table
          columns={columns}
          dataSource={clients}
          rowKey="id"
          loading={isLoading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} clients`,
          }}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  )
} 