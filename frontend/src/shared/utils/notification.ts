import React from 'react'
import { notification } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined, WarningOutlined } from '@ant-design/icons'

interface NotificationOptions {
  message: string
  description?: string
  duration?: number
}

class NotificationService {
  private defaultDuration = 2

  success(options: NotificationOptions) {
    notification.success({
      message: options.message,
      duration: options.duration || this.defaultDuration,
      icon: React.createElement(CheckCircleOutlined, { style: { color: '#52c41a' } }),
      placement: 'topRight',
    })
  }

  error(options: NotificationOptions) {
    notification.error({
      message: options.message,
      duration: options.duration || this.defaultDuration,
      icon: React.createElement(CloseCircleOutlined, { style: { color: '#ff4d4f' } }),
      placement: 'topRight',
    })
  }

  warning(options: NotificationOptions) {
    notification.warning({
      message: options.message,
      duration: options.duration || this.defaultDuration,
      icon: React.createElement(WarningOutlined, { style: { color: '#faad14' } }),
      placement: 'topRight',
    })
  }

  info(options: NotificationOptions) {
    notification.info({
      message: options.message,
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
    })
  }

  deleteError(resourceName: string) {
    this.error({ 
      message: `Failed to delete ${resourceName}`,
    })
  }

  updateSuccess(resourceName: string) {
    this.success({ 
      message: `${resourceName} updated successfully`,
    })
  }

  updateError(resourceName: string) {
    this.error({ 
      message: `Failed to update ${resourceName}`,
    })
  }

  createSuccess(resourceName: string) {
    this.success({ 
      message: `${resourceName} created successfully`,
    })
  }

  createError(resourceName: string) {
    this.error({ 
      message: `Failed to create ${resourceName}`,
    })
  }
}

export const notificationService = new NotificationService() 