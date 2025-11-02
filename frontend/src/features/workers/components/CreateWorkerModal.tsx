import { useState } from 'react'
import { 
  Modal, 
  Form, 
  Input, 
  Select, 
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
import { useWorkerStore } from '../../../app/store/workerStore'
import { Country, Currency } from '../../../shared/types/worker'

const { Title } = Typography
const { Option } = Select

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

interface CreateWorkerModalProps {
  visible: boolean
  onCancel: () => void
  onSuccess: () => void
}

export default function CreateWorkerModal({ 
  visible, 
  onCancel, 
  onSuccess 
}: CreateWorkerModalProps) {
  const [form] = Form.useForm()
  const [isSaving, setIsSaving] = useState(false)
  const [specialties, setSpecialties] = useState<string[]>([])
  const [specialtyInput, setSpecialtyInput] = useState('')
  const [metadataItems, setMetadataItems] = useState<Array<{ key: string; value: string }>>([])
  
  const { createWorker } = useWorkerStore()

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
        phoneNumber: values.phoneNumber || undefined,
        email: values.email || undefined,
        currency: values.currency || undefined,
        instituteId: values.instituteId || undefined,
        specialties: specialties.length > 0 ? specialties : undefined,
        metadata: Object.keys(metadata).length > 0 ? metadata : undefined
      }

      await createWorker(createData)
      message.success('Worker created successfully')
      handleCancel()
      onSuccess()
    } catch (err: any) {
      if (err.errorFields) {
        message.error('Please check the form fields')
      } else {
        if (err.status === 409) {
          message.error('A worker with this name already exists. Please choose a different name.')
        } else {
          message.error('Failed to create worker')
        }
      }
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    form.resetFields()
    setSpecialties([])
    setSpecialtyInput('')
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

  return (
    <Modal
      title={
        <Title level={3} style={{ margin: 0 }}>
          Create New Worker
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
          Create Worker
        </Button>
      ]}
      width={800}
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
          label="Worker Name"
          rules={[
            { required: true, message: 'Please enter worker name' },
            { min: 2, message: 'Name must be at least 2 characters' },
            { max: 50, message: 'Name must not exceed 50 characters' }
          ]}
        >
          <Input 
            size="large" 
            placeholder="Enter worker's name"
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
            placeholder="Enter worker's email address"
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
          label="Preferred Currency"
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
                size="large"
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
                <Typography.Text type="secondary">
                  No specialties added yet. Add specialties to help categorize workers.
                </Typography.Text>
              </div>
            )}
          </SpecialtiesEditor>
        </div>

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
                  placeholder="Field name (e.g., Address, Experience, Certifications)"
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
                  Click "Add Field" to add custom information like address, experience, certifications, etc.
                </Typography.Text>
              </div>
            )}
          </MetadataEditor>
        </div>
      </Form>
    </Modal>
  )
} 