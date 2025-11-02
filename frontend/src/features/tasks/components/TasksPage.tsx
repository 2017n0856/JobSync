import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Card, 
  Typography, 
  Button, 
  Table, 
  Input,
  Select,
  DatePicker,
  Space
} from 'antd'
import { 
  PlusOutlined, 
  SearchOutlined
} from '@ant-design/icons'
import styled from 'styled-components'
import { useTaskStore } from '../../../app/store/taskStore'
import { Task, TaskFilters } from '../services/taskService'
import { TaskType } from '../../../shared/types/enums'
import { notificationService } from '../../../shared/utils/notification'
import dayjs from 'dayjs'

const { Title, Text } = Typography
const { Option } = Select
const { RangePicker } = DatePicker

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
  align-items: flex-start;
  flex-wrap: wrap;
`

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
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

export default function TasksPage() {
  const navigate = useNavigate()
  
  const {
    tasks,
    total,
    page,
    limit,
    isLoading,
    error,
    fetchTasks,
    clearError
  } = useTaskStore()

  const [filters, setFilters] = useState<TaskFilters>({
    page: 1,
    limit: 10,
  })
  
  const [nameSearchValue, setNameSearchValue] = useState('')
  const [clientNameSearchValue, setClientNameSearchValue] = useState('')
  const [workerNameSearchValue, setWorkerNameSearchValue] = useState('')
  
  const debouncedNameSearch = useDebounce(nameSearchValue, 800)
  const debouncedClientNameSearch = useDebounce(clientNameSearchValue, 800)
  const debouncedWorkerNameSearch = useDebounce(workerNameSearchValue, 800)

  const pagination = {
    current: page,
    pageSize: limit,
    total: total,
  }

  useEffect(() => {
    const newFilters = {
      ...filters,
      name: debouncedNameSearch || undefined,
      clientName: debouncedClientNameSearch || undefined,
      workerName: debouncedWorkerNameSearch || undefined,
      page: 1,
    }
    setFilters(newFilters)
  }, [debouncedNameSearch, debouncedClientNameSearch, debouncedWorkerNameSearch])

  useEffect(() => {
    fetchTasks(filters)
  }, [
    fetchTasks, 
    filters.page, 
    filters.limit, 
    filters.name, 
    filters.clientName,
    filters.workerName,
    filters.taskType,
    filters.taskStatus,
    filters.clientPaymentStatus,
    filters.workerPaymentStatus,
    filters.deadlineDateFrom,
    filters.deadlineDateTo
  ])

  useEffect(() => {
    return () => {
      clearError()
    }
  }, [clearError])

  useEffect(() => {
    if (error) {
      notificationService.apiError('Failed to load tasks', error)
    }
  }, [error])

  const handleNameSearchChange = (value: string) => {
    setNameSearchValue(value)
  }

  const handleClientNameSearchChange = (value: string) => {
    setClientNameSearchValue(value)
  }

  const handleWorkerNameSearchChange = (value: string) => {
    setWorkerNameSearchValue(value)
  }

  const handleTaskTypeChange = (value: TaskType | undefined) => {
    setFilters({
      ...filters,
      taskType: value,
      page: 1,
    })
  }

  const handleTaskStatusChange = (value: 'assigned' | 'not_assigned' | 'delivered' | undefined) => {
    setFilters({
      ...filters,
      taskStatus: value,
      page: 1,
    })
  }

  const handleClientPaymentStatusChange = (value: 'yes' | 'no' | undefined) => {
    setFilters({
      ...filters,
      clientPaymentStatus: value,
      page: 1,
    })
  }

  const handleWorkerPaymentStatusChange = (value: 'yes' | 'no' | undefined) => {
    setFilters({
      ...filters,
      workerPaymentStatus: value,
      page: 1,
    })
  }

  const handleDeadlineDateRangeChange = (dates: any) => {
    if (dates && dates.length === 2) {
      setFilters({
        ...filters,
        deadlineDateFrom: dates[0].format('YYYY-MM-DD'),
        deadlineDateTo: dates[1].format('YYYY-MM-DD'),
        page: 1,
      })
    } else {
      setFilters({
        ...filters,
        deadlineDateFrom: undefined,
        deadlineDateTo: undefined,
        page: 1,
      })
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

  const handleTaskClick = (id: number) => {
    navigate(`/tasks/${id}`)
  }

  const columns = [
    {
      title: 'Client',
      dataIndex: ['client', 'name'],
      key: 'clientName',
      width: 100,
      render: (_: string, record: Task) => (
        <Typography.Text>
          {record.client?.name || '-'}
        </Typography.Text>
      ),
    },
    {
      title: 'Task',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (name: string, record: Task) => (
        <Button 
          type="link" 
          onClick={() => handleTaskClick(record.id)}
          style={{ padding: 0, height: 'auto', fontWeight: 'bold' }}
        >
          {name}
        </Button>
      ),
    },
    {
      title: 'Deadline',
      dataIndex: 'deadlineDate',
      key: 'deadlineDate',
      width: 100,
      render: (deadlineDate: string) => (
        <Typography.Text>
          {deadlineDate ? dayjs(deadlineDate).format('DD-MMM-YY') : '-'}
        </Typography.Text>
      ),
    },
    {
      title: 'Submitted',
      dataIndex: 'submittedOnDate',
      key: 'submitted',
      width: 90,
      render: (submittedOnDate: string) => (
        <Typography.Text>
          {submittedOnDate ? 'Yes' : 'No'}
        </Typography.Text>
      ),
    },
    {
      title: 'Payment',
      dataIndex: 'clientPaymentDecided',
      key: 'clientPaymentDecided',
      width: 90,
      render: (amount: number | string, record: Task) => {
        if (amount === undefined || amount === null || amount === '') {
          return <Typography.Text>-</Typography.Text>
        }
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
        if (isNaN(numAmount)) {
          return <Typography.Text>-</Typography.Text>
        }
        return <Typography.Text>{`${Math.round(numAmount)} ${record.client?.currency || ''}`}</Typography.Text>
      },
    },
    {
      title: 'Received',
      dataIndex: 'clientPaymentMade',
      key: 'clientPaymentMade',
      width: 90,
      render: (amount: number | string, record: Task) => {
        if (amount === undefined || amount === null || amount === '') {
          return <Typography.Text>-</Typography.Text>
        }
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
        if (isNaN(numAmount)) {
          return <Typography.Text>-</Typography.Text>
        }
        return <Typography.Text>{`${Math.round(numAmount)} ${record.client?.currency || ''}`}</Typography.Text>
      },
    },
    {
      title: 'Worker',
      dataIndex: ['worker', 'name'],
      key: 'workerName',
      width: 120,
      render: (_: string, record: Task) => (
        <Typography.Text>
          {record.worker?.name || '-'}
        </Typography.Text>
      ),
    },
    {
      title: 'Payment',
      dataIndex: 'workerPaymentDecided',
      key: 'workerPaymentDecided',
      width: 120,
      render: (amount: number | string, record: Task) => {
        if (!record.worker) {
          return <Typography.Text>-</Typography.Text>
        }
        if (amount === undefined || amount === null || amount === '') {
          return <Typography.Text>-</Typography.Text>
        }
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
        if (isNaN(numAmount)) {
          return <Typography.Text>-</Typography.Text>
        }
        return <Typography.Text>{`${Math.round(numAmount)} ${record.worker?.currency || ''}`}</Typography.Text>
      },
    },
    {
      title: 'Transferred',
      dataIndex: 'workerPaymentMade',
      key: 'workerPaymentMade',
      width: 120,
      render: (amount: number | string, record: Task) => {
        if (!record.worker) {
          return <Typography.Text>-</Typography.Text>
        }
        if (amount === undefined || amount === null || amount === '') {
          return <Typography.Text>-</Typography.Text>
        }
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
        if (isNaN(numAmount)) {
          return <Typography.Text>-</Typography.Text>
        }
        return <Typography.Text>{`${Math.round(numAmount)} ${record.worker?.currency || ''}`}</Typography.Text>
      },
    },
  ]

  return (
    <div>
      <PageHeader>
        <div>
          <Title level={2}>Tasks</Title>
          <Text type="secondary">
            Manage and track all your project tasks.
          </Text>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          size="large"
        >
          Create Task
        </Button>
      </PageHeader>

      <FilterSection>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <FilterRow>
            <FilterGroup>
              <Text strong style={{ display: 'block', marginBottom: 4 }}>
                Filter by Task Name
              </Text>
              <Input
                placeholder="Search tasks by name..."
                allowClear
                onChange={(e) => handleNameSearchChange(e.target.value)}
                style={{ width: 250 }}
                prefix={<SearchOutlined />}
              />
            </FilterGroup>
            <FilterGroup>
              <Text strong style={{ display: 'block', marginBottom: 4 }}>
                Filter by Client Name
              </Text>
              <Input
                placeholder="Search by client name..."
                allowClear
                onChange={(e) => handleClientNameSearchChange(e.target.value)}
                style={{ width: 250 }}
                prefix={<SearchOutlined />}
              />
            </FilterGroup>
            <FilterGroup>
              <Text strong style={{ display: 'block', marginBottom: 4 }}>
                Filter by Worker Name
              </Text>
              <Input
                placeholder="Search by worker name..."
                allowClear
                onChange={(e) => handleWorkerNameSearchChange(e.target.value)}
                style={{ width: 250 }}
                prefix={<SearchOutlined />}
              />
            </FilterGroup>
          </FilterRow>
          <FilterRow>
            <FilterGroup>
              <Text strong style={{ display: 'block', marginBottom: 4 }}>
                Task Type
              </Text>
              <Select
                placeholder="Select task type"
                allowClear
                style={{ width: 250 }}
                onChange={handleTaskTypeChange}
              >
                {Object.entries(TaskType).map(([key, value]) => (
                  <Option key={key} value={value}>
                    {value}
                  </Option>
                ))}
              </Select>
            </FilterGroup>
            <FilterGroup>
              <Text strong style={{ display: 'block', marginBottom: 4 }}>
                Task Status
              </Text>
              <Select
                placeholder="Select task status"
                allowClear
                style={{ width: 250 }}
                onChange={handleTaskStatusChange}
              >
                <Option value="assigned">Assigned</Option>
                <Option value="not_assigned">Not Assigned</Option>
                <Option value="delivered">Delivered</Option>
              </Select>
            </FilterGroup>
            <FilterGroup>
              <Text strong style={{ display: 'block', marginBottom: 4 }}>
                Client Payment Status
              </Text>
              <Select
                placeholder="Select client payment status"
                allowClear
                style={{ width: 250 }}
                onChange={handleClientPaymentStatusChange}
              >
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>
            </FilterGroup>
            <FilterGroup>
              <Text strong style={{ display: 'block', marginBottom: 4 }}>
                Worker Payment Status
              </Text>
              <Select
                placeholder="Select worker payment status"
                allowClear
                style={{ width: 250 }}
                onChange={handleWorkerPaymentStatusChange}
              >
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>
            </FilterGroup>
          </FilterRow>
          <FilterRow>
            <FilterGroup>
              <Text strong style={{ display: 'block', marginBottom: 4 }}>
                Deadline Date Range
              </Text>
              <RangePicker
                style={{ width: 300 }}
                onChange={handleDeadlineDateRangeChange}
                format="YYYY-MM-DD"
              />
            </FilterGroup>
          </FilterRow>
        </Space>
      </FilterSection>

      <Card>
        <Table
          columns={columns}
          dataSource={tasks}
          rowKey="id"
          loading={isLoading}
          bordered
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} tasks`,
          }}
          onChange={handleTableChange}
          scroll={{ x: 1800 }}
        />
      </Card>
    </div>
  )
}
