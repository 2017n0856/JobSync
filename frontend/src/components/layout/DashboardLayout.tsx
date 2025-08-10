import { Layout } from 'antd'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const { Content } = Layout

const StyledLayout = styled(Layout)`
  height: 100vh;
  overflow: hidden;
`

const StyledContent = styled(Content)`
  margin: 24px;
  margin-left: 274px;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  overflow-y: auto;
  height: calc(100vh - 48px);

  @media (max-width: 768px) {
    margin-left: 24px;
    margin-top: 80px;
    height: calc(100vh - 104px);
  }
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