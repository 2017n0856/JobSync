import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Card, 
  Typography, 
  Button, 
  Table, 
  Input, 
  Tag,
  Tooltip,
  Modal,
  Input as AntInput,
  Space
} from 'antd'
import { 
  PlusOutlined, 
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined
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
    updateInstitute,
    deleteInstitute,
    clearError
  } = useInstituteStore()

  // Local state for UI interactions
  const [filters, setFilters] = useState<InstituteFilters>({
    page: 1,
    limit: 10,
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingData, setEditingData] = useState<{ name: string; country: string }>({ name: '', country: '' })
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  
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
    navigate(`/dashboard/institutes/${id}`)
  }

  const handleEdit = (record: Institute) => {
    setEditingId(record.id)
    setEditingData({ name: record.name, country: record.country || '' })
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditingData({ name: '', country: '' })
  }

  const handleEditSave = async () => {
    if (!editingId) return

    try {
      const updateData: any = {}
      if (editingData.name) updateData.name = editingData.name
      if (editingData.country) updateData.country = editingData.country

      await updateInstitute(editingId, updateData)
      notificationService.updateSuccess('Institute')
      setEditingId(null)
      setEditingData({ name: '', country: '' })
    } catch (err) {
      notificationService.updateError('Institute')
    }
  }

  const handleDelete = (record: Institute) => {
    setDeletingId(record.id)
    setDeleteModalVisible(true)
  }

  const confirmDelete = async () => {
    if (!deletingId) return

    try {
      await deleteInstitute(deletingId)
      notificationService.deleteSuccess('Institute')
      setDeleteModalVisible(false)
      setDeletingId(null)
    } catch (err) {
      notificationService.deleteError('Institute')
    }
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
          <Text>
            {((currentPage - 1) * pageSize) + index + 1}
          </Text>
        )
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: Institute) => {
        if (editingId === record.id) {
          return (
            <AntInput
              value={editingData.name}
              onChange={(e) => setEditingData({ ...editingData, name: e.target.value })}
              size="small"
            />
          )
        }
        return (
          <Button 
            type="link" 
            onClick={() => handleInstituteClick(record.id)}
            style={{ padding: 0, height: 'auto', fontWeight: 'bold' }}
          >
            {name}
          </Button>
        )
      },
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      render: (country: string, record: Institute) => {
        if (editingId === record.id) {
          return (
            <AntInput
              value={editingData.country}
              onChange={(e) => setEditingData({ ...editingData, country: e.target.value })}
              size="small"
              placeholder="Enter country"
            />
          )
        }
        return (
          <Text>
            {country || '-'}
          </Text>
        )
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (record: Institute) => {
        if (editingId === record.id) {
          return (
            <Space size="small">
              <Tooltip title="Save">
                <Button
                  type="text"
                  icon={<CheckOutlined />}
                  onClick={handleEditSave}
                  style={{ color: '#52c41a' }}
                />
              </Tooltip>
              <Tooltip title="Cancel">
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  onClick={handleEditCancel}
                  style={{ color: '#ff4d4f' }}
                />
              </Tooltip>
            </Space>
          )
        }
        return (
          <Space size="small">
            <Tooltip title="Edit">
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleEdit(record)}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record)}
                style={{ color: '#ff4d4f' }}
              />
            </Tooltip>
          </Space>
        )
      },
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

      <Modal
        title="Confirm Delete"
        open={deleteModalVisible}
        onOk={confirmDelete}
        onCancel={() => {
          setDeleteModalVisible(false)
          setDeletingId(null)
        }}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this institute? This action cannot be undone.</p>
      </Modal>
    </div>
  )
} 