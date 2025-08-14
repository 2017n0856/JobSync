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
  message
} from 'antd'
import { 
  ArrowLeftOutlined, 
  BankOutlined, 
  EditOutlined, 
  SaveOutlined, 
  CloseOutlined,
  DeleteOutlined,
  PlusOutlined,
  MinusCircleOutlined
} from '@ant-design/icons'
import styled from 'styled-components'
import { useInstituteStore } from '../../../app/store/instituteStore'

import { notificationService } from '../../../shared/utils/notification'

const { Title, Text } = Typography

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

export default function InstituteDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  
  const {
    currentInstitute,
    isLoadingDetail,
    error,
    fetchInstituteById,
    updateInstitute,
    deleteInstitute,
    clearError
  } = useInstituteStore()

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [metadataItems, setMetadataItems] = useState<Array<{ key: string; value: string }>>([])

  useEffect(() => {
    if (!id) return
    
    const instituteId = parseInt(id)
    if (currentInstitute?.id === instituteId) {
      return
    }
    
    fetchInstituteById(instituteId)
  }, [id, currentInstitute, fetchInstituteById])

  useEffect(() => {
    if (error) {
      notificationService.apiError('Failed to load institute details', error)
    }
  }, [error])

  useEffect(() => {
    return () => {
      clearError()
    }
  }, [clearError])

  useEffect(() => {
    if (currentInstitute) {
      form.setFieldsValue({
        name: currentInstitute.name,
        country: currentInstitute.country || '',
      })
      
      if (currentInstitute.metadata) {
        let metadataObj: Record<string, any>
        
        if (typeof currentInstitute.metadata === 'string') {
          try {
            metadataObj = JSON.parse(currentInstitute.metadata)
          } catch {
            metadataObj = {}
          }
        } else {
          metadataObj = currentInstitute.metadata
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
  }, [currentInstitute, form])

  const handleBack = () => {
    navigate('/institutes')
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    if (currentInstitute) {
      form.setFieldsValue({
        name: currentInstitute.name,
        country: currentInstitute.country || '',
      })
      
      if (currentInstitute.metadata) {
        let metadataObj: Record<string, any>
        
        if (typeof currentInstitute.metadata === 'string') {
          try {
            metadataObj = JSON.parse(currentInstitute.metadata)
          } catch {
            metadataObj = {}
          }
        } else {
          metadataObj = currentInstitute.metadata
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
        country: values.country || undefined,
        metadata: Object.keys(metadata).length > 0 ? metadata : undefined
      }

      await updateInstitute(currentInstitute!.id, updateData)
      notificationService.updateSuccess('Institute')
      setIsEditing(false)
    } catch (err: any) {
      if (err.errorFields) {
        message.error('Please check the form fields')
      } else {
        if (err.status === 409) {
          notificationService.error({
            message: 'Duplicate Institute Name',
            description: 'An institute with this name already exists. Please choose a different name.'
          })
        } else {
          notificationService.updateError('Institute')
        }
      }
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = () => {
    setDeleteModalVisible(true)
  }

  const confirmDelete = async () => {
    try {
      setIsDeleting(true)
      await deleteInstitute(currentInstitute!.id)
      notificationService.deleteSuccess('Institute')
      navigate('/dashboard/institutes')
    } catch (err) {
      notificationService.deleteError('Institute')
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

  if (isLoadingDetail) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (!currentInstitute) {
    return (
      <div>
        <PageHeader>
          <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
            Back to Institutes
          </Button>
        </PageHeader>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Text type="secondary">Institute not found</Text>
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader>
        <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
          Back to Institutes
        </Button>
        <Title level={2} style={{ margin: 0 }}>
          <BankOutlined style={{ marginRight: 8 }} />
          {currentInstitute.name}
        </Title>
        <Space style={{ marginLeft: 'auto' }}>
          {isEditing ? (
            <>
              <Button 
                type="primary" 
                icon={<SaveOutlined />} 
                onClick={handleSave}
                loading={isSaving}
              >
                Save Changes
              </Button>
              <Button 
                icon={<CloseOutlined />} 
                onClick={handleCancel}
                disabled={isSaving}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button 
                icon={<EditOutlined />} 
                onClick={handleEdit}
              >
                Edit Institute
              </Button>
              <Button 
                danger 
                icon={<DeleteOutlined />} 
                onClick={handleDelete}
              >
                Delete Institute
              </Button>
            </>
          )}
        </Space>
      </PageHeader>

      <StyledCard>
        <Form form={form} layout="vertical">
          <Title level={3} style={{ marginBottom: 24, color: '#262626' }}>
            Basic Information
          </Title>
          
          <FieldContainer>
            <div className="field-value" style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <Text strong style={{ fontSize: '16px', color: '#262626', minWidth: '120px' }}>
                Institute ID:
              </Text>
              <Text code style={{ fontSize: '16px', color: '#595959' }}>{currentInstitute.id}</Text>
            </div>
          </FieldContainer>

          <FieldContainer>
            <div className="field-value" style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <Text strong style={{ fontSize: '16px', color: '#262626', minWidth: '120px' }}>
                Institute Name:
              </Text>
              {isEditing ? (
                <Form.Item 
                  name="name" 
                  rules={[{ required: true, message: 'Institute name is required' }]}
                  style={{ marginBottom: 0, flex: 1 }}
                >
                  <Input 
                    size="large" 
                    placeholder="Enter institute name"
                    className="field-input"
                  />
                </Form.Item>
              ) : (
                <Text strong style={{ fontSize: '18px', color: '#262626' }}>
                  {currentInstitute.name}
                </Text>
              )}
            </div>
          </FieldContainer>

          <FieldContainer>
            <div className="field-value" style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <Text strong style={{ fontSize: '16px', color: '#262626', minWidth: '120px' }}>
                Country:
              </Text>
              {isEditing ? (
                <Form.Item 
                  name="country" 
                  style={{ marginBottom: 0, flex: 1 }}
                >
                  <Input 
                    size="large" 
                    placeholder="Enter country"
                    className="field-input"
                  />
                </Form.Item>
              ) : (
                <Text style={{ fontSize: '16px', color: '#595959' }}>
                  {currentInstitute.country || 'Not specified'}
                </Text>
              )}
            </div>
          </FieldContainer>

          <MetadataSection>
            <SectionTitle>
              <Title level={3} style={{ margin: 0, color: '#262626' }}>
                Additional Information
              </Title>
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
            
            {isEditing ? (
              <MetadataEditor>
                {metadataItems.map((item, index) => (
                  <div key={index} className="metadata-item">
                    <Input
                      placeholder="Field name (e.g., Address, Phone, Website)"
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
                    <Text type="secondary" style={{ fontSize: '16px' }}>
                      No additional information available.
                    </Text>
                    <br />
                    <Text type="secondary">
                      Click "Add Field" to add custom information like address, phone number, website, etc.
                    </Text>
                  </div>
                )}
              </MetadataEditor>
            ) : (
              <div>
                {currentInstitute.metadata ? (
                  (() => {
                    let metadataObj: Record<string, any>
                    
                    if (typeof currentInstitute.metadata === 'string') {
                      try {
                        metadataObj = JSON.parse(currentInstitute.metadata)
                      } catch {
                        metadataObj = {}
                      }
                    } else {
                      metadataObj = currentInstitute.metadata
                    }
                    
                    if (Object.keys(metadataObj).length > 0) {
                      return Object.entries(metadataObj).map(([key, value]) => (
                        <FieldContainer key={key}>
                          <div className="field-value" style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                            <Text strong style={{ fontSize: '16px', color: '#262626', minWidth: '120px' }}>
                              {key}:
                            </Text>
                            <div style={{ flex: 1 }}>
                              {typeof value === 'object' ? (
                                <pre style={{ 
                                  margin: 0, 
                                  fontSize: '14px', 
                                  backgroundColor: '#f5f5f5', 
                                  padding: '12px', 
                                  borderRadius: '6px',
                                  overflow: 'auto',
                                  border: '1px solid #e8e8e8'
                                }}>
                                  {JSON.stringify(value, null, 2)}
                                </pre>
                              ) : (
                                <Text style={{ fontSize: '16px', color: '#595959' }}>
                                  {String(value)}
                                </Text>
                              )}
                            </div>
                          </div>
                        </FieldContainer>
                      ))
                    } else {
                      return (
                        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#8c8c8c' }}>
                          <Text type="secondary" style={{ fontSize: '16px' }}>
                            No additional information available.
                          </Text>
                        </div>
                      )
                    }
                  })()
                ) : (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: '#8c8c8c' }}>
                    <Text type="secondary" style={{ fontSize: '16px' }}>
                      No additional information available.
                    </Text>
                  </div>
                )}
              </div>
            )}
          </MetadataSection>
        </Form>
      </StyledCard>

      <Modal
        title="Confirm Delete Institute"
        open={deleteModalVisible}
        onOk={confirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Delete Institute"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
        confirmLoading={isDeleting}
      >
        <p>Are you sure you want to delete <strong>"{currentInstitute.name}"</strong>?</p>
        <p style={{ color: '#ff4d4f' }}>This action cannot be undone and will permanently remove the institute from the system.</p>
      </Modal>
    </div>
  )
} 