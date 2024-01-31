import React from 'react'
// import Header from './header'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCookie from '../../hooks/useCookie';
import './layout.css';
import { Dropdown,Avatar } from 'antd';
import {
  BarsOutlined,
  EnvironmentOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined, 
  LogoutOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme ,Button} from 'antd';

const {Header,  Content, Sider } = Layout;
type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({children}:Props) {
  const [collapsed, setCollapsed] = useState(false);
  const { isLoading, currentUser }: { isLoading: boolean, currentUser: any } = useCookie();
  const navigate = useNavigate();
  const handleItemClick = (itemName: string) => {
    console.log(`Item clicked: ${itemName}`);
    navigate(itemName);
  };

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    onClick?: () => void,  // Thêm trường onClick kiểu hàm xử lý sự kiện click
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      onClick,  // Gán giá trị của onClick từ tham số đầu vào
    } as MenuItem;
  }
  const items: MenuItem[] = [
    getItem('Báo cáo', '1', <PieChartOutlined />, () => handleItemClick('/')),
    ...(!isLoading && currentUser === 'Administrator' ? [getItem('Nhân viên', '2', <UserOutlined />, () => handleItemClick('/router-control'))] : []),
    getItem('Danh mục', 'sub1', <BarsOutlined />, undefined, [
        getItem('Sản phẩm', '3', undefined, () => handleItemClick('/router-product_sku')),
        getItem('Tài sản', '4', undefined, () => { console.log('123') }),
        getItem('Vật phẩm trưng bày', '5', undefined, () => { console.log('123') }),
    ]),
    getItem('Kịch bản', 'sub2', <TeamOutlined />, undefined, [
        getItem('Kịch bản sản phẩm', '6', undefined, () => { console.log('123') }),
        getItem('Kịch bản tài sản', '8', undefined, () => { console.log('123') }),
        getItem('Kịch bản vật phẩm trưng bày', '9', undefined, () => { console.log('123') }),
    ]),
    getItem('Điểm bán', '10', <EnvironmentOutlined />, () => { console.log('123') }),
];

type MenuItem = Required<MenuProps>['items'][number];
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const UserProfileMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <a href="/">Thông tin cá nhân</a>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        <a href="/">Đăng xuất</a>
      </Menu.Item>
    </Menu>
  );
  return (
    // <div className='bg-[#F5F7FA]'>
    // <Header/>
    // <div className='max-w-full w-[80%] mx-auto'><div  className="rounded-md">{children}</div></div>
    // </div>
    <Layout style={{ minHeight: '100vh' }}>
    <Sider style={{ background: colorBgContainer }} trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Menu  defaultSelectedKeys={['1']} mode="inline" items={items}>
        </Menu>
    </Sider>
    <Layout>
    <Header style={{ padding: 0, background: colorBgContainer, display:'flex', justifyContent:'space-between',alignItems:'center' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
            <div style={{paddingRight:'10px'}}>
            <Dropdown overlay={UserProfileMenu} trigger={['click']}>
      <Avatar icon={<UserOutlined />}  />
    </Dropdown>
            </div>
           
           
          
        </Header>
      {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Báo cáo</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
         <div className='max-w-full w-[100%] mx-auto'><div  className="rounded-md">{children}</div></div>
        </div>
      </Content>
      {/* <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer> */}
    </Layout>
  </Layout>
  )
}
