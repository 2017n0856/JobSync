import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
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
import { useWorkerStore } from '../../../app/store/workerStore'
import { Country, Currency } from '../../../shared/types/worker'

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

const SpecialtiesEditor = styled.div`
  .specialties-input {
    margin-bottom: 16px;
  }
  
  .specialties-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
`

export default function WorkerDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const {
    currentWorker,
    isLoadingDetail,
    error,
    fetchWorkerById,
    updateWorker,
    deleteWorker,
    clearError,
    clearCurrentWorker
  } = useWorkerStore()

  const [isEditing, setIsEditing] = useState(false)
  const [form] = Form.useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [metadataItems, setMetadataItems] = useState<Array<{ key: string; value: string }>>([])
  const [specialties, setSpecialties] = useState<string[]>([])
  const [specialtyInput, setSpecialtyInput] = useState('')

  useEffect(() => {
    if (id) {
      fetchWorkerById(parseInt(id))
    }
  }, [id, fetchWorkerById])

  useEffect(() => {
    return () => {
      clearError()
      clearCurrentWorker()
    }
  }, [clearError, clearCurrentWorker])

  useEffect(() => {
    if (error) {
      message.error('Failed to load worker details')
    }
  }, [error])

  useEffect(() => {
    if (currentWorker && !isEditing) {
      if (currentWorker.metadata && typeof currentWorker.metadata === 'object') {
        const metadataArray = Object.entries(currentWorker.metadata).map(([key, value]) => ({
          key,
          value: typeof value === 'string' ? value : JSON.stringify(value)
        }))
        setMetadataItems(metadataArray)
      } else {
        setMetadataItems([])
      }
      
      if (currentWorker.specialties) {
        setSpecialties(currentWorker.specialties)
      } else {
        setSpecialties([])
      }
    }
  }, [currentWorker, isEditing])

  const handleEdit = () => {
    if (currentWorker) {
      if (currentWorker.metadata && typeof currentWorker.metadata === 'object') {
        const metadataArray = Object.entries(currentWorker.metadata).map(([key, value]) => ({
          key,
          value: typeof value === 'string' ? value : JSON.stringify(value)
        }))
        setMetadataItems(metadataArray)
      } else {
        setMetadataItems([])
      }
      
      if (currentWorker.specialties) {
        setSpecialties(currentWorker.specialties)
      } else {
        setSpecialties([])
      }
      
      form.setFieldsValue({
        name: currentWorker.name,
        email: currentWorker.email,
        phoneNumber: currentWorker.phoneNumber,
        country: currentWorker.country,
        currency: currentWorker.currency,
        instituteId: currentWorker.instituteId,
      })
      setIsEditing(true)
    }
  }

  const handleSave = async () => {
    if (!currentWorker) return
    
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
        specialties: specialties.length > 0 ? specialties : undefined,
        metadata: Object.keys(metadata).length > 0 ? metadata : undefined
      }
      
      await updateWorker(currentWorker.id, updateData)
      message.success('Worker updated successfully')
      setIsEditing(false)
    } catch (error) {
      message.error('Failed to update worker')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    form.resetFields()
  }

  const handleDelete = async () => {
    if (!currentWorker) return
    
    setIsSubmitting(true)
    try {
      await deleteWorker(currentWorker.id)
      message.success('Worker deleted successfully')
      navigate('/workers')
    } catch (error) {
      message.error('Failed to delete worker')
    } finally {
      setIsSubmitting(false)
      setDeleteModalVisible(false)
    }
  }

  const handleBack = () => {
    navigate('/workers')
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

  const addSpecialty = () => {
    if (specialtyInput.trim() && !specialties.includes(specialtyInput.trim())) {
      setSpecialties([...specialties, specialtyInput.trim()])
      setSpecialtyInput('')
    }
  }

  const removeSpecialty = (specialtyToRemove: string) => {
    setSpecialties(specialties.filter(specialty => specialty !== specialtyToRemove))
  }

  const handleSpecialtyInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSpecialty()
    }
  }

  if (isLoadingDetail) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Text>Loading worker details...</Text>
        </div>
      </Card>
    )
  }

  if (!currentWorker) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Text>Worker not found</Text>
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
            Back to Workers
          </Button>
          <Title level={2}>{currentWorker.name}</Title>
          <Text type="secondary">Worker Details</Text>
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
              <Text strong>{currentWorker.name}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              <Text>{currentWorker.email || '-'}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Phone Number">
              <Text>{currentWorker.phoneNumber || '-'}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Country">
              <Text>{currentWorker.country || '-'}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Currency">
              <Text>{currentWorker.currency || '-'}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Institute" span={2}>
              {currentWorker.instituteId ? (
                <Link to={`/institutes/${currentWorker.instituteId}`}>
                  <Text>{currentWorker.institute?.name || '-'}</Text>
                </Link>
              ) : (
                <Text>-</Text>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Specialties" span={2}>
              <div>
                {currentWorker.specialties && currentWorker.specialties.length > 0 ? (
                  currentWorker.specialties.map((specialty, index) => (
                    <Text key={index} style={{ marginRight: 8 }}>
                      {specialty}
                    </Text>
                  ))
                ) : (
                  <Text type="secondary">No specialties</Text>
                )}
              </div>
            </Descriptions.Item>
            {currentWorker.metadata && (
              <Descriptions.Item label="Additional Information" span={2}>
                <MetadataSection>
                  {(() => {
                    let metadataObj: Record<string, any>
                    
                    if (typeof currentWorker.metadata === 'string') {
                      try {
                        metadataObj = JSON.parse(currentWorker.metadata)
                      } catch {
                        metadataObj = {}
                      }
                    } else {
                      metadataObj = currentWorker.metadata
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
              label="Worker Name"
              rules={[
                { required: true, message: 'Please enter worker name' },
                { min: 2, message: 'Name must be at least 2 characters' },
                { max: 50, message: 'Name must not exceed 50 characters' }
              ]}
            >
              <Input placeholder="Enter worker name" />
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

            <div style={{ marginTop: 32 }}>
              <Space style={{ marginBottom: 20 }}>
                <Title level={4} style={{ margin: 0 }}>
                  Specialties
                </Title>
                <Button 
                  type="dashed" 
                  icon={<PlusOutlined />}
                  onClick={addSpecialty}
                  disabled={!specialtyInput.trim()}
                >
                  Add Specialty
                </Button>
              </Space>
              
              <SpecialtiesEditor>
                <div className="specialties-input">
                  <Input
                    placeholder="Enter a specialty and press Enter or click Add Specialty"
                    value={specialtyInput}
                    onChange={(e) => setSpecialtyInput(e.target.value)}
                    onKeyPress={handleSpecialtyInputKeyPress}
                  />
                </div>
                
                <div className="specialties-tags">
                  {specialties.map((specialty, index) => (
                    <Button
                      key={index}
                      type="primary"
                      size="small"
                      onClick={() => removeSpecialty(specialty)}
                      style={{ marginBottom: 8 }}
                    >
                      {specialty} ×
                    </Button>
                  ))}
                </div>
                
                {specialties.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '20px', color: '#8c8c8c' }}>
                    <Text type="secondary">
                      No specialties added yet. Add specialties to help categorize workers.
                    </Text>
                  </div>
                )}
              </SpecialtiesEditor>
            </div>

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
                      placeholder="Field name (e.g., Address, Experience, Certifications)"
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
                      Click "Add Field" to add custom information like address, experience, certifications, etc.
                    </Text>
                  </div>
                )}
              </MetadataEditor>
            </MetadataSection>
          </Form>
        )}
      </Card>

      <Modal
        title="Delete Worker"
        open={deleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
        confirmLoading={isSubmitting}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete "{currentWorker.name}"? This action cannot be undone.</p>
      </Modal>
    </div>
  )
} 