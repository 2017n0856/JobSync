import { Layout } from 'antd'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const { Content } = Layout

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`

const StyledContent = styled(Content)`
  margin: 24px;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  min-height: calc(100vh - 48px);
`

export default function DashboardLayout() {
  return (
    <StyledLayout>
      <Sidebar />
      <StyledContent>
        <Outlet />
      </StyledContent>
    </StyledLayout>
  )
} 