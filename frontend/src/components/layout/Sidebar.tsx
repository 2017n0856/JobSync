import { NavLink } from 'react-router-dom'
import { Layout, Menu, Avatar, Button, Typography } from 'antd'
import { 
  HomeOutlined,
  UserOutlined, 
  TeamOutlined, 
  FileTextOutlined, 
  BankOutlined, 
  BarChartOutlined, 
  LogoutOutlined
} from '@ant-design/icons'
import styled from 'styled-components'
import { useAuthStore } from '../../store/authStore'

const { Sider } = Layout
const { Text } = Typography

const StyledSider = styled(Sider)`
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }
`

const Logo = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const UserSection = styled.div`
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: auto;
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`

const navigation = [
  { key: '/dashboard', icon: <HomeOutlined />, label: 'Dashboard' },
  { key: '/dashboard/clients', icon: <UserOutlined />, label: 'Clients' },
  { key: '/dashboard/workers', icon: <TeamOutlined />, label: 'Workers' },
  { key: '/dashboard/tasks', icon: <FileTextOutlined />, label: 'Tasks' },
  { key: '/dashboard/institutes', icon: <BankOutlined />, label: 'Institutes' },
  { key: '/dashboard/stats', icon: <BarChartOutlined />, label: 'Stats' },
]

export default function Sidebar() {
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
  }

  const getSelectedKey = () => {
    const path = window.location.pathname
    return path === '/dashboard' ? '/dashboard' : path
  }

  return (
    <StyledSider width={250} theme="dark">
      <Logo>JobSync</Logo>
      
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[getSelectedKey()]}
        items={navigation.map(item => ({
          key: item.key,
          icon: item.icon,
          label: <NavLink to={item.key}>{item.label}</NavLink>,
        }))}
        style={{ flex: 1, borderRight: 0 }}
      />

      <UserSection>
        <UserInfo>
          <Avatar 
            size={32} 
            icon={<UserOutlined />}
            style={{ marginRight: 12 }}
          />
          <div>
            <div style={{ color: 'white', fontSize: '14px', fontWeight: 500 }}>
              {user?.name}
            </div>
            <Text style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '12px' }}>
              @{user?.username}
            </Text>
          </div>
        </UserInfo>
        <Button
          type="text"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          style={{ color: 'rgba(255, 255, 255, 0.65)', width: '100%' }}
        >
          Logout
        </Button>
      </UserSection>
    </StyledSider>
  )
} 