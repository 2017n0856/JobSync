import React from 'react'
import { notification } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined, WarningOutlined } from '@ant-design/icons'

interface NotificationOptions {
  message: string
  description?: string
  duration?: number
}

class NotificationService {
  private defaultDuration = 4.5

  success(options: NotificationOptions) {
    notification.success({
      message: options.message,
      description: options.description,
      duration: options.duration || this.defaultDuration,
      icon: React.createElement(CheckCircleOutlined, { style: { color: '#52c41a' } }),
      placement: 'topRight',
    })
  }

  error(options: NotificationOptions) {
    notification.error({
      message: options.message,
      description: options.description,
      duration: options.duration || this.defaultDuration,
      icon: React.createElement(CloseCircleOutlined, { style: { color: '#ff4d4f' } }),
      placement: 'topRight',
    })
  }

  warning(options: NotificationOptions) {
    notification.warning({
      message: options.message,
      description: options.description,
      duration: options.duration || this.defaultDuration,
      icon: React.createElement(WarningOutlined, { style: { color: '#faad14' } }),
      placement: 'topRight',
    })
  }

  info(options: NotificationOptions) {
    notification.info({
      message: options.message,
      description: options.description,
      duration: options.duration || this.defaultDuration,
      icon: React.createElement(InfoCircleOutlined, { style: { color: '#1890ff' } }),
      placement: 'topRight',
    })
  }

  apiSuccess(message: string, description?: string) {
    this.success({ message, description })
  }

  apiError(message: string, description?: string) {
    this.error({ message, description })
  }

  deleteSuccess(resourceName: string) {
    this.success({ 
      message: `${resourceName} deleted successfully`,
      description: 'The item has been permanently removed.'
    })
  }

  deleteError(resourceName: string) {
    this.error({ 
      message: `Failed to delete ${resourceName}`,
      description: 'Please try again or contact support if the problem persists.'
    })
  }

  updateSuccess(resourceName: string) {
    this.success({ 
      message: `${resourceName} updated successfully`,
      description: 'Your changes have been saved.'
    })
  }

  updateError(resourceName: string) {
    this.error({ 
      message: `Failed to update ${resourceName}`,
      description: 'Please check your input and try again.'
    })
  }

  createSuccess(resourceName: string) {
    this.success({ 
      message: `${resourceName} created successfully`,
      description: 'The new item has been added to the system.'
    })
  }

  createError(resourceName: string) {
    this.error({ 
      message: `Failed to create ${resourceName}`,
      description: 'Please check your input and try again.'
    })
  }
}

export const notificationService = new NotificationService() 