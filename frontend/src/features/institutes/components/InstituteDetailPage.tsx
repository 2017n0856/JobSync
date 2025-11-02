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
import { useInstituteStore } from '../../../app/store/instituteStore'

const { Title, Text } = Typography

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

export default function InstituteDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const {
    currentInstitute,
    isLoadingDetail,
    error,
    fetchInstituteById,
    updateInstitute,
    deleteInstitute,
    clearError,
    clearCurrentInstitute
  } = useInstituteStore()

  const [isEditing, setIsEditing] = useState(false)
  const [form] = Form.useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [metadataItems, setMetadataItems] = useState<Array<{ key: string; value: string }>>([])

  useEffect(() => {
    if (id) {
      fetchInstituteById(parseInt(id))
    }
  }, [id, fetchInstituteById])

  useEffect(() => {
    return () => {
      clearError()
      clearCurrentInstitute()
    }
  }, [clearError, clearCurrentInstitute])

  useEffect(() => {
    if (error) {
      message.error('Failed to load institute details')
    }
  }, [error])

  useEffect(() => {
    if (currentInstitute && !isEditing) {
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
  }, [currentInstitute, isEditing])

  const handleEdit = () => {
    if (currentInstitute) {
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
      
      form.setFieldsValue({
        name: currentInstitute.name,
        country: currentInstitute.country,
      })
      setIsEditing(true)
    }
  }

  const handleSave = async () => {
    if (!currentInstitute) return
    
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
        metadata: Object.keys(metadata).length > 0 ? metadata : undefined
      }
      
      await updateInstitute(currentInstitute.id, updateData)
      message.success('Institute updated successfully')
      setIsEditing(false)
    } catch (error) {
      message.error('Failed to update institute')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    form.resetFields()
  }

  const handleDelete = async () => {
    if (!currentInstitute) return
    
    setIsSubmitting(true)
    try {
      await deleteInstitute(currentInstitute.id)
      message.success('Institute deleted successfully')
      navigate('/institutes')
    } catch (error) {
      message.error('Failed to delete institute')
    } finally {
      setIsSubmitting(false)
      setDeleteModalVisible(false)
    }
  }

  const handleBack = () => {
    navigate('/institutes')
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
          <Text>Loading institute details...</Text>
        </div>
      </Card>
    )
  }

  if (!currentInstitute) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Text>Institute not found</Text>
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
            Back to Institutes
          </Button>
          <Title level={2}>{currentInstitute.name}</Title>
          <Text type="secondary">Institute Details</Text>
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
              <Text strong>{currentInstitute.name}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Country">
              <Text>{currentInstitute.country || '-'}</Text>
            </Descriptions.Item>
            {currentInstitute.metadata ? (
              <Descriptions.Item label="Additional Information" span={2}>
                <MetadataSection>
                  {(() => {
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
                        <div key={key} style={{ marginBottom: 8 }}>
                          <Text strong>{key}:</Text> {String(value)}
                        </div>
                      ))
                    }
                    return <Text type="secondary">No additional information</Text>
                  })()}
                </MetadataSection>
              </Descriptions.Item>
            ) : null}
          </Descriptions>
        ) : (
          <Form
            form={form}
            layout="vertical"
          >
            <Form.Item
              name="name"
              label="Institute Name"
              rules={[
                { required: true, message: 'Please enter institute name' },
                { min: 2, message: 'Name must be at least 2 characters' },
                { max: 255, message: 'Name must not exceed 255 characters' }
              ]}
            >
              <Input placeholder="Enter institute name" />
            </Form.Item>

            <Form.Item
              name="country"
              label="Country"
            >
              <Input placeholder="Enter country" />
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
                      placeholder="Field name (e.g., Founded, Type, Accreditation)"
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
                      Click "Add Field" to add custom information like founded year, type, accreditation, etc.
                    </Text>
                  </div>
                )}
              </MetadataEditor>
            </MetadataSection>
          </Form>
        )}
      </Card>

      <Modal
        title="Delete Institute"
        open={deleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
        confirmLoading={isSubmitting}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete "{currentInstitute.name}"? This action cannot be undone.</p>
      </Modal>
    </div>
  )
} 