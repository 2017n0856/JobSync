import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Card, 
  Typography, 
  Button, 
  Spin, 
  Input,
  Space,
  Modal,
  Form,
  message,
  Tag,
  Select
} from 'antd'
import { 
  ArrowLeftOutlined, 
  EditOutlined, 
  SaveOutlined, 
  CloseOutlined,
  DeleteOutlined,
  PlusOutlined,
  MinusCircleOutlined
} from '@ant-design/icons'
import styled from 'styled-components'
import { useWorkerStore } from '../../../app/store/workerStore'
import { notificationService } from '../../../shared/utils/notification'
import { Country, Currency } from '../../../shared/types/worker'

const { Title, Text } = Typography
const { Option } = Select

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`

const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 32px;
  }
`

const FieldContainer = styled.div`
  margin-bottom: 24px;
  
  .field-value {
    font-size: 16px;
    color: #595959;
  }
  
  .field-input {
    margin-top: 4px;
  }
`

const MetadataSection = styled.div`
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
`

const MetadataEditor = styled.div`
  .metadata-item {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
    align-items: center;
  }
  
  .metadata-input {
    flex: 1;
  }
  
  .metadata-actions {
    display: flex;
    gap: 8px;
  }
`

const SpecialtiesSection = styled.div`
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
`

const SpecialtiesEditor = styled.div`
  .specialties-input {
    margin-bottom: 12px;
  }
  
  .specialties-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
`

const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h4 {
    margin: 0;
    color: #262626;
  }
`

export default function WorkerDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  
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
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [metadataItems, setMetadataItems] = useState<Array<{ key: string; value: string }>>([])
  const [specialties, setSpecialties] = useState<string[]>([])
  const [specialtyInput, setSpecialtyInput] = useState('')

  useEffect(() => {
    if (id) {
      fetchWorkerById(parseInt(id))
    }
    return () => {
      clearError()
      clearCurrentWorker()
    }
  }, [id, fetchWorkerById, clearError, clearCurrentWorker])

  useEffect(() => {
    if (error) {
      notificationService.apiError('Failed to load worker details', error)
    }
  }, [error])

  useEffect(() => {
    if (currentWorker) {
      form.setFieldsValue({
        name: currentWorker.name,
        email: currentWorker.email,
        phoneNumber: currentWorker.phoneNumber,
        country: currentWorker.country,
        currency: currentWorker.currency,
        instituteId: currentWorker.instituteId,
      })
      
      if (currentWorker.metadata && typeof currentWorker.metadata === 'object') {
        const metadataArray = Object.entries(currentWorker.metadata).map(([key, value]) => ({
          key,
          value: typeof value === 'string' ? value : JSON.stringify(value)
        }))
        setMetadataItems(metadataArray)
      } else {
        setMetadataItems([])
      }
      
      setSpecialties(currentWorker.specialties || [])
    }
  }, [currentWorker, form])

  const handleBack = () => {
    navigate('/workers')
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    if (currentWorker) {
      form.setFieldsValue({
        name: currentWorker.name,
        email: currentWorker.email,
        phoneNumber: currentWorker.phoneNumber,
        country: currentWorker.country,
        currency: currentWorker.currency,
        instituteId: currentWorker.instituteId,
      })
      
      if (currentWorker.metadata && typeof currentWorker.metadata === 'object') {
        const metadataArray = Object.entries(currentWorker.metadata).map(([key, value]) => ({
          key,
          value: typeof value === 'string' ? value : JSON.stringify(value)
        }))
        setMetadataItems(metadataArray)
      } else {
        setMetadataItems([])
      }
      
      setSpecialties(currentWorker.specialties || [])
    }
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
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
        email: values.email || undefined,
        phoneNumber: values.phoneNumber || undefined,
        country: values.country || undefined,
        currency: values.currency || undefined,
        instituteId: values.instituteId || undefined,
        specialties: specialties.length > 0 ? specialties : undefined,
        metadata: Object.keys(metadata).length > 0 ? metadata : undefined
      }

      if (id) {
        await updateWorker(parseInt(id), updateData)
        notificationService.updateSuccess('Worker')
        setIsEditing(false)
      }
    } catch (err: any) {
      if (err.errorFields) {
        message.error('Please check the form fields')
      } else {
        if (err.status === 409) {
          notificationService.error({
            message: 'Duplicate Worker Name',
            description: 'A worker with this name already exists. Please choose a different name.'
          })
        } else {
          notificationService.updateError('Worker')
        }
      }
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      if (id) {
        await deleteWorker(parseInt(id))
        notificationService.deleteSuccess('Worker')
        navigate('/workers')
      }
    } catch (error) {
      notificationService.deleteError('Worker')
    } finally {
      setIsDeleting(false)
      setDeleteModalVisible(false)
    }
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
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>
          <Text>Loading worker details...</Text>
        </div>
      </div>
    )
  }

  if (!currentWorker) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Text>Worker not found</Text>
        <br />
        <Button type="primary" onClick={handleBack} style={{ marginTop: 16 }}>
          Back to Workers
        </Button>
      </div>
    )
  }

  return (
    <div>
      <PageHeader>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={handleBack}
          size="large"
        >
          Back
        </Button>
        <div style={{ flex: 1 }}>
          <Title level={2} style={{ margin: 0 }}>
            {isEditing ? 'Edit Worker' : currentWorker.name}
          </Title>
        </div>
        <Space>
          {!isEditing ? (
            <>
              <Button 
                icon={<EditOutlined />} 
                onClick={handleEdit}
                size="large"
              >
                Edit
              </Button>
              <Button 
                danger 
                icon={<DeleteOutlined />} 
                onClick={() => setDeleteModalVisible(true)}
                size="large"
              >
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button 
                icon={<CloseOutlined />} 
                onClick={handleCancel}
                size="large"
              >
                Cancel
              </Button>
              <Button 
                type="primary" 
                icon={<SaveOutlined />} 
                onClick={handleSave}
                loading={isSaving}
                size="large"
              >
                Save
              </Button>
            </>
          )}
        </Space>
      </PageHeader>

      <StyledCard>
        <Form form={form} layout="vertical" disabled={!isEditing}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <FieldContainer>
              <Text strong>Full Name</Text>
              {!isEditing ? (
                <div className="field-value">{currentWorker.name}</div>
              ) : (
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: 'Full name is required' }]}
                  className="field-input"
                >
                  <Input size="large" />
                </Form.Item>
              )}
            </FieldContainer>

            <FieldContainer>
              <Text strong>Email Address</Text>
              {!isEditing ? (
                <div className="field-value">{currentWorker.email || '-'}</div>
              ) : (
                <Form.Item
                  name="email"
                  rules={[
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                  className="field-input"
                >
                  <Input size="large" />
                </Form.Item>
              )}
            </FieldContainer>

            <FieldContainer>
              <Text strong>Phone Number</Text>
              {!isEditing ? (
                <div className="field-value">{currentWorker.phoneNumber || '-'}</div>
              ) : (
                <Form.Item name="phoneNumber" className="field-input">
                  <Input size="large" />
                </Form.Item>
              )}
            </FieldContainer>

            <FieldContainer>
              <Text strong>Country</Text>
              {!isEditing ? (
                <div className="field-value">{currentWorker.country || '-'}</div>
              ) : (
                <Form.Item name="country" className="field-input">
                  <Select
                    size="large"
                    placeholder="Select country"
                    allowClear
                  >
                    {Object.entries(Country).map(([key, value]) => (
                      <Option key={key} value={value}>
                        {value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            </FieldContainer>

            <FieldContainer>
              <Text strong>Currency</Text>
              {!isEditing ? (
                <div className="field-value">{currentWorker.currency || '-'}</div>
              ) : (
                <Form.Item name="currency" className="field-input">
                  <Select
                    size="large"
                    placeholder="Select currency"
                    allowClear
                  >
                    {Object.entries(Currency).map(([key, value]) => (
                      <Option key={key} value={value}>
                        {value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            </FieldContainer>

            <FieldContainer>
              <Text strong>Institute ID</Text>
              {!isEditing ? (
                <div className="field-value">{currentWorker.instituteId || '-'}</div>
              ) : (
                <Form.Item name="instituteId" className="field-input">
                  <Input size="large" type="number" />
                </Form.Item>
              )}
            </FieldContainer>

            <FieldContainer>
              <Text strong>Institute</Text>
              <div className="field-value">
                {currentWorker.institute?.name || '-'}
              </div>
            </FieldContainer>
          </div>

          <SpecialtiesSection>
            <SectionTitle>
              <Title level={4}>Specialties</Title>
              {isEditing && (
                <Button 
                  type="dashed" 
                  icon={<PlusOutlined />}
                  onClick={addSpecialty}
                  disabled={!specialtyInput.trim()}
                >
                  Add Specialty
                </Button>
              )}
            </SectionTitle>
            
            <SpecialtiesEditor>
              {isEditing && (
                <div className="specialties-input">
                  <Input
                    placeholder="Enter a specialty and press Enter or click Add Specialty"
                    value={specialtyInput}
                    onChange={(e) => setSpecialtyInput(e.target.value)}
                    onKeyPress={handleSpecialtyInputKeyPress}
                    size="large"
                  />
                </div>
              )}
              
              <div className="specialties-tags">
                {specialties.map((specialty, index) => (
                  <Tag
                    key={index}
                    color="blue"
                    closable={isEditing}
                    onClose={() => isEditing && removeSpecialty(specialty)}
                    style={{ marginBottom: 8 }}
                  >
                    {specialty}
                  </Tag>
                ))}
              </div>
              
              {specialties.length === 0 && (
                <div style={{ textAlign: 'center', padding: '20px', color: '#8c8c8c' }}>
                  <Text type="secondary">
                    No specialties added yet.
                  </Text>
                </div>
              )}
            </SpecialtiesEditor>
          </SpecialtiesSection>

          <MetadataSection>
            <SectionTitle>
              <Title level={4}>Additional Information</Title>
              {isEditing && (
                <Button 
                  type="dashed" 
                  icon={<PlusOutlined />}
                  onClick={addMetadataItem}
                >
                  Add Field
                </Button>
              )}
            </SectionTitle>
            
            {!isEditing && currentWorker.metadata && typeof currentWorker.metadata === 'object' ? (
              <div>
                {Object.entries(currentWorker.metadata).map(([key, value]) => (
                  <FieldContainer key={key}>
                    <Text strong>{key}</Text>
                    <div className="field-value">
                      {typeof value === 'string' ? value : JSON.stringify(value)}
                    </div>
                  </FieldContainer>
                ))}
              </div>
            ) : isEditing ? (
              <MetadataEditor>
                {metadataItems.map((item, index) => (
                  <div key={index} className="metadata-item">
                    <Input
                      placeholder="Field name"
                      value={item.key}
                      onChange={(e) => updateMetadataItem(index, 'key', e.target.value)}
                      style={{ width: 250 }}
                      size="large"
                    />
                    <Input
                      placeholder="Field value"
                      value={item.value}
                      onChange={(e) => updateMetadataItem(index, 'value', e.target.value)}
                      className="metadata-input"
                      size="large"
                    />
                    <Button 
                      type="text" 
                      danger 
                      icon={<MinusCircleOutlined />}
                      onClick={() => removeMetadataItem(index)}
                      size="large"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                {metadataItems.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: '#8c8c8c' }}>
                    <Text type="secondary">
                      No additional information added.
                    </Text>
                  </div>
                )}
              </MetadataEditor>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px', color: '#8c8c8c' }}>
                <Text type="secondary">
                  No additional information available.
                </Text>
              </div>
            )}
          </MetadataSection>
        </Form>
      </StyledCard>

      <Modal
        title="Delete Worker"
        open={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setDeleteModalVisible(false)}>
            Cancel
          </Button>,
          <Button 
            key="delete" 
            danger 
            onClick={handleDelete}
            loading={isDeleting}
          >
            Delete
          </Button>
        ]}
      >
        <p>
          Are you sure you want to delete worker "{currentWorker.name}"? 
          This action cannot be undone.
        </p>
      </Modal>
    </div>
  )
} 