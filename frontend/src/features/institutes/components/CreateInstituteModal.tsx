import { useState } from 'react'
import { 
  Modal, 
  Form, 
  Input, 
  Button, 
  Space, 
  Typography,
  message
} from 'antd'
import { 
  PlusOutlined, 
  MinusCircleOutlined 
} from '@ant-design/icons'
import styled from 'styled-components'
import { useInstituteStore } from '../../../app/store/instituteStore'

const { Title } = Typography

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

interface CreateInstituteModalProps {
  visible: boolean
  onCancel: () => void
  onSuccess: () => void
}

export default function CreateInstituteModal({ 
  visible, 
  onCancel, 
  onSuccess 
}: CreateInstituteModalProps) {
  const [form] = Form.useForm()
  const [isSaving, setIsSaving] = useState(false)
  const [metadataItems, setMetadataItems] = useState<Array<{ key: string; value: string }>>([])
  
  const { createInstitute } = useInstituteStore()

  const handleSave = async () => {
    setIsSaving(true)
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

      const createData = {
        name: values.name,
        country: values.country || undefined,
        metadata: Object.keys(metadata).length > 0 ? metadata : undefined
      }

      await createInstitute(createData)
      message.success('Institute created successfully')
      handleCancel()
      onSuccess()
    } catch (err: any) {
      if (err.errorFields) {
        message.error('Please check the form fields')
      } else {
        if (err.status === 409) {
          message.error('An institute with this name already exists. Please choose a different name.')
        } else {
          message.error('Failed to create institute')
        }
      }
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    form.resetFields()
    setMetadataItems([])
    onCancel()
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

  return (
    <Modal
      title={
        <Title level={3} style={{ margin: 0 }}>
          Create New Institute
        </Title>
      }
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button 
          key="save" 
          type="primary" 
          onClick={handleSave}
          loading={isSaving}
        >
          Create Institute
        </Button>
      ]}
      width={800}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Institute Name"
          rules={[{ required: true, message: 'Institute name is required' }]}
        >
          <Input 
            size="large" 
            placeholder="Enter institute name"
          />
        </Form.Item>

        <Form.Item
          name="country"
          label="Country"
        >
          <Input 
            size="large" 
            placeholder="Enter country"
          />
        </Form.Item>

        <div style={{ marginTop: 32 }}>
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
                <Typography.Text type="secondary" style={{ fontSize: '16px' }}>
                  No additional information added.
                </Typography.Text>
                <br />
                <Typography.Text type="secondary">
                  Click "Add Field" to add custom information like founded year, type, accreditation, etc.
                </Typography.Text>
              </div>
            )}
          </MetadataEditor>
        </div>
      </Form>
    </Modal>
  )
} 