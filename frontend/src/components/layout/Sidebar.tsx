import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Layout, Menu, Avatar, Button, Typography, Drawer } from 'antd'
import { 
  HomeOutlined,
  UserOutlined, 
  TeamOutlined, 
  FileTextOutlined, 
  BankOutlined, 
  BarChartOutlined, 
  LogoutOutlined,
  MenuOutlined,
  CloseOutlined
} from '@ant-design/icons'
import styled from 'styled-components'
import { useAuthStore } from '../../store/authStore'

const { Sider } = Layout
const { Text } = Typography

const StyledSider = styled(Sider)`
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const MobileMenuButton = styled(Button)`
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 1001;
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
  }
`

const MobileDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 0;
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
  position: sticky;
  bottom: 0;
  background: #001529;
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`

const navigation = [
  { key: '/dashboard', icon: <HomeOutlined />, label: 'Dashboard' },
  { key: '/clients', icon: <UserOutlined />, label: 'Clients' },
  { key: '/workers', icon: <TeamOutlined />, label: 'Workers' },
  { key: '/tasks', icon: <FileTextOutlined />, label: 'Tasks' },
  { key: '/institutes', icon: <BankOutlined />, label: 'Institutes' },
  { key: '/stats', icon: <BarChartOutlined />, label: 'Stats' },
]

export default function Sidebar() {
  const { user, logout } = useAuthStore()
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleLogout = () => {
    logout()
    setMobileDrawerVisible(false)
  }

  const getSelectedKey = () => {
    const path = window.location.pathname
    return path === '/dashboard' ? '/dashboard' : path
  }

  const handleNavClick = () => {
    if (isMobile) {
      setMobileDrawerVisible(false)
    }
  }

  const renderSidebarContent = () => (
    <>
      <Logo>JobSync</Logo>
      
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[getSelectedKey()]}
        items={navigation.map(item => ({
          key: item.key,
          icon: item.icon,
          label: <NavLink to={item.key} onClick={handleNavClick}>{item.label}</NavLink>,
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
    </>
  )

  return (
    <>
      <MobileMenuButton
        type="primary"
        icon={<MenuOutlined />}
        onClick={() => setMobileDrawerVisible(true)}
        size="large"
      />
      
      <StyledSider width={250} theme="dark">
        {renderSidebarContent()}
      </StyledSider>

      <MobileDrawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: 'white' }}>JobSync</span>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setMobileDrawerVisible(false)}
              style={{ color: 'white' }}
            />
          </div>
        }
        placement="left"
        onClose={() => setMobileDrawerVisible(false)}
        open={mobileDrawerVisible}
        width={250}
        bodyStyle={{ padding: 0, backgroundColor: '#001529' }}
        headerStyle={{ backgroundColor: '#001529', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {renderSidebarContent()}
        </div>
      </MobileDrawer>
    </>
  )
} 