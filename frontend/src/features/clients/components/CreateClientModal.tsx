import { useState } from 'react'
import { 
  Modal, 
  Form, 
  Input, 
  Select, 
  Button, 
  message,
  Space,
  Typography
} from 'antd'
import { 
  PlusOutlined, 
  MinusCircleOutlined 
} from '@ant-design/icons'
import styled from 'styled-components'
import { useClientStore } from '../../../app/store/clientStore'
import { Country, Currency } from '../../../shared/types/client'
import { notificationService } from '../../../shared/utils/notification'

const { Title } = Typography
const { Option } = Select

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

interface CreateClientModalProps {
  visible: boolean
  onCancel: () => void
  onSuccess: () => void
}

export default function CreateClientModal({ 
  visible, 
  onCancel, 
  onSuccess 
}: CreateClientModalProps) {
  const [form] = Form.useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [metadataItems, setMetadataItems] = useState<Array<{ key: string; value: string }>>([])
  
  const { createClient } = useClientStore()

  const handleSubmit = async () => {
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

      const clientData = {
        name: values.name,
        country: values.country || undefined,
        phoneNumber: values.phoneNumber || undefined,
        email: values.email || undefined,
        currency: values.currency || undefined,
        instituteId: values.instituteId || undefined,
        metadata: Object.keys(metadata).length > 0 ? JSON.stringify(metadata) : undefined
      }
      
      await createClient(clientData)
      message.success('Client created successfully')
      form.resetFields()
      setMetadataItems([])
      onSuccess()
      onCancel()
    } catch (error) {
      notificationService.apiError('Failed to create client', typeof error === 'string' ? error : 'Unknown error')
    } finally {
      setIsSubmitting(false)
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
          Create New Client
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
          onClick={handleSubmit}
          loading={isSubmitting}
        >
          Create Client
        </Button>
      ]}
      width={600}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          country: Country.AUSTRALIA,
          currency: Currency.AUD,
        }}
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
          <Input 
            size="large" 
            placeholder="Enter client name"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input 
            size="large" 
            placeholder="Enter email address"
          />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Phone Number"
        >
          <Input 
            size="large" 
            placeholder="Enter phone number"
          />
        </Form.Item>

        <Form.Item
          name="country"
          label="Country"
        >
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

        <Form.Item
          name="currency"
          label="Currency"
        >
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

        <Form.Item
          name="instituteId"
          label="Institute ID"
        >
          <Input 
            size="large" 
            placeholder="Enter institute ID"
            type="number"
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
                  placeholder="Field name (e.g., Address, Industry, Founded)"
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
                  Click "Add Field" to add custom information like address, industry, founded year, etc.
                </Typography.Text>
              </div>
            )}
          </MetadataEditor>
        </div>
      </Form>
    </Modal>
  )
} 