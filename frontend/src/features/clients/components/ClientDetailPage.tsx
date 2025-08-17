import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Card, 
  Typography, 
  Button, 
  Descriptions, 
  Modal, 
  message,
  Form,
  Input,
  Select,
  Space
} from 'antd'
import { 
  EditOutlined, 
  SaveOutlined, 
  CloseOutlined, 
  DeleteOutlined,
  ArrowLeftOutlined,
  PlusOutlined,
  MinusCircleOutlined
} from '@ant-design/icons'
import styled from 'styled-components'
import { useClientStore } from '../../../app/store/clientStore'
import { Country, Currency } from '../../../shared/types/client'
import { notificationService } from '../../../shared/utils/notification'

const { Title, Text } = Typography
const { Option } = Select

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`

const MetadataSection = styled.div`
  margin-top: 16px;
`

const MetadataEditor = styled.div`
  .metadata-item {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 12px;
  }
  
  .metadata-input {
    flex: 1;
  }
`

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const {
    currentClient,
    isLoadingDetail,
    error,
    fetchClientById,
    updateClient,
    deleteClient,
    clearError,
    clearCurrentClient
  } = useClientStore()

  const [isEditing, setIsEditing] = useState(false)
  const [form] = Form.useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [metadataItems, setMetadataItems] = useState<Array<{ key: string; value: string }>>([])

  useEffect(() => {
    if (id) {
      fetchClientById(parseInt(id))
    }
  }, [id, fetchClientById])

  useEffect(() => {
    return () => {
      clearError()
      clearCurrentClient()
    }
  }, [clearError, clearCurrentClient])

  useEffect(() => {
    if (error) {
      notificationService.apiError('Failed to load client details', typeof error === 'string' ? error : 'Unknown error')
    }
  }, [error])

  useEffect(() => {
    if (currentClient && !isEditing) {
      if (currentClient.metadata) {
        let metadataObj: Record<string, any>
        
        if (typeof currentClient.metadata === 'string') {
          try {
            metadataObj = JSON.parse(currentClient.metadata)
          } catch {
            metadataObj = {}
          }
        } else {
          metadataObj = currentClient.metadata
        }
        
        const metadataArray = Object.entries(metadataObj).map(([key, value]) => ({
          key,
          value: typeof value === 'string' ? value : JSON.stringify(value)
        }))
        setMetadataItems(metadataArray)
      } else {
        setMetadataItems([])
      }
    }
  }, [currentClient, isEditing])

  const handleEdit = () => {
    if (currentClient) {
      if (currentClient.metadata) {
        let metadataObj: Record<string, any>
        
        if (typeof currentClient.metadata === 'string') {
          try {
            metadataObj = JSON.parse(currentClient.metadata)
          } catch {
            metadataObj = {}
          }
        } else {
          metadataObj = currentClient.metadata
        }
        
        const metadataArray = Object.entries(metadataObj).map(([key, value]) => ({
          key,
          value: typeof value === 'string' ? value : JSON.stringify(value)
        }))
        setMetadataItems(metadataArray)
      } else {
        setMetadataItems([])
      }
      
      form.setFieldsValue({
        name: currentClient.name,
        email: currentClient.email,
        phoneNumber: currentClient.phoneNumber,
        country: currentClient.country,
        currency: currentClient.currency,
        instituteId: currentClient.instituteId,
      })
      setIsEditing(true)
    }
  }

  const handleSave = async () => {
    if (!currentClient) return
    
    setIsSubmitting(true)
    try {
      const values = await form.validateFields()
      
      const metadata: Record<string, any> = {}
      metadataItems.forEach(item => {
        if (item.key.trim()) {
          try {
            metadata[item.key.trim()] = JSON.parse(item.value)
          } catch {
            metadata[item.key.trim()] = item.value
          }
        }
      })
      
      const updateData = {
        name: values.name,
        country: values.country || undefined,
        phoneNumber: values.phoneNumber || undefined,
        email: values.email || undefined,
        currency: values.currency || undefined,
        instituteId: values.instituteId || undefined,
        metadata: Object.keys(metadata).length > 0 ? JSON.stringify(metadata) : undefined
      }
      
      await updateClient(currentClient.id, updateData)
      message.success('Client updated successfully')
      setIsEditing(false)
    } catch (error) {
      notificationService.apiError('Failed to update client', typeof error === 'string' ? error : 'Unknown error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    form.resetFields()
  }

  const handleDelete = async () => {
    if (!currentClient) return
    
    setIsSubmitting(true)
    try {
      await deleteClient(currentClient.id)
      message.success('Client deleted successfully')
      navigate('/clients')
    } catch (error) {
      notificationService.apiError('Failed to delete client', typeof error === 'string' ? error : 'Unknown error')
    } finally {
      setIsSubmitting(false)
      setDeleteModalVisible(false)
    }
  }

  const handleBack = () => {
    navigate('/clients')
  }

  const addMetadataItem = () => {
    setMetadataItems([...metadataItems, { key: '', value: '' }])
  }

  const removeMetadataItem = (index: number) => {
    setMetadataItems(metadataItems.filter((_, i) => i !== index))
  }

  const updateMetadataItem = (index: number, field: 'key' | 'value', value: string) => {
    const newItems = [...metadataItems]
    newItems[index][field] = value
    setMetadataItems(newItems)
  }

  if (isLoadingDetail) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Text>Loading client details...</Text>
        </div>
      </Card>
    )
  }

  if (!currentClient) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Text>Client not found</Text>
        </div>
      </Card>
    )
  }

  return (
    <div>
      <PageHeader>
        <div>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={handleBack}
            style={{ marginBottom: 16 }}
          >
            Back to Clients
          </Button>
          <Title level={2}>{currentClient.name}</Title>
          <Text type="secondary">Client Details</Text>
        </div>
        <ActionButtons>
          {!isEditing ? (
            <>
              <Button 
                icon={<EditOutlined />} 
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button 
                danger 
                icon={<DeleteOutlined />} 
                onClick={() => setDeleteModalVisible(true)}
              >
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button 
                icon={<SaveOutlined />} 
                type="primary"
                loading={isSubmitting}
                onClick={handleSave}
              >
                Save
              </Button>
              <Button 
                icon={<CloseOutlined />} 
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </>
          )}
        </ActionButtons>
      </PageHeader>

      <Card>
        {!isEditing ? (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Name" span={2}>
              <Text strong>{currentClient.name}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              <Text>{currentClient.email || '-'}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Phone Number">
              <Text>{currentClient.phoneNumber || '-'}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Country">
              <Text>{currentClient.country || '-'}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Currency">
              <Text>{currentClient.currency || '-'}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Institute" span={2}>
              <Text>{currentClient.institute?.name || '-'}</Text>
            </Descriptions.Item>
            {currentClient.metadata && (
              <Descriptions.Item label="Additional Information" span={2}>
                <MetadataSection>
                  {(() => {
                    let metadataObj: Record<string, any>
                    
                    if (typeof currentClient.metadata === 'string') {
                      try {
                        metadataObj = JSON.parse(currentClient.metadata)
                      } catch {
                        metadataObj = {}
                      }
                    } else {
                      metadataObj = currentClient.metadata
                    }
                    
                    if (Object.keys(metadataObj).length > 0) {
                      return Object.entries(metadataObj).map(([key, value]) => (
                        <div key={key} style={{ marginBottom: 8 }}>
                          <Text strong>{key}:</Text> {String(value)}
                        </div>
                      ))
                    }
                    return <Text type="secondary">No additional information</Text>
                  })()}
                </MetadataSection>
              </Descriptions.Item>
            )}
          </Descriptions>
        ) : (
          <Form
            form={form}
            layout="vertical"
          >
            <Form.Item
              name="name"
              label="Client Name"
              rules={[
                { required: true, message: 'Please enter client name' },
                { min: 2, message: 'Name must be at least 2 characters' },
                { max: 50, message: 'Name must not exceed 50 characters' }
              ]}
            >
              <Input placeholder="Enter client name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input placeholder="Enter email address" />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              label="Phone Number"
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>

            <Form.Item
              name="country"
              label="Country"
            >
              <Select placeholder="Select country">
                {Object.entries(Country).map(([key, value]) => (
                  <Option key={key} value={value}>
                    {value}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="currency"
              label="Currency"
            >
              <Select placeholder="Select currency">
                {Object.entries(Currency).map(([key, value]) => (
                  <Option key={key} value={value}>
                    {value}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="instituteId"
              label="Institute ID"
            >
              <Input placeholder="Enter institute ID" type="number" />
            </Form.Item>

            <MetadataSection>
              <Space style={{ marginBottom: 20 }}>
                <Title level={4} style={{ margin: 0 }}>
                  Additional Information
                </Title>
                <Button 
                  type="dashed" 
                  icon={<PlusOutlined />}
                  onClick={addMetadataItem}
                >
                  Add Field
                </Button>
              </Space>
              
              <MetadataEditor>
                {metadataItems.map((item, index) => (
                  <div key={index} className="metadata-item">
                    <Input
                      placeholder="Field name (e.g., Address, Industry, Founded)"
                      value={item.key}
                      onChange={(e) => updateMetadataItem(index, 'key', e.target.value)}
                      style={{ width: 250 }}
                    />
                    <Input
                      placeholder="Field value"
                      value={item.value}
                      onChange={(e) => updateMetadataItem(index, 'value', e.target.value)}
                      className="metadata-input"
                    />
                    <Button 
                      type="text" 
                      danger 
                      icon={<MinusCircleOutlined />}
                      onClick={() => removeMetadataItem(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                {metadataItems.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: '#8c8c8c' }}>
                    <Text type="secondary" style={{ fontSize: '16px' }}>
                      No additional information added.
                    </Text>
                    <br />
                    <Text type="secondary">
                      Click "Add Field" to add custom information like address, industry, founded year, etc.
                    </Text>
                  </div>
                )}
              </MetadataEditor>
            </MetadataSection>
          </Form>
        )}
      </Card>

      <Modal
        title="Delete Client"
        open={deleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
        confirmLoading={isSubmitting}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete "{currentClient.name}"? This action cannot be undone.</p>
      </Modal>
    </div>
  )
} 