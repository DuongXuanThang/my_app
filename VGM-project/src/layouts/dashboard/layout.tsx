import React from 'react'
// import Header from './header'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCookie from '../../hooks/useCookie';
import './layout.css';
import { Dropdown,Avatar,Tooltip,Row,Col } from 'antd';
import {
  BarsOutlined,
  EnvironmentOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined, 
  LogoutOutlined,
  SettingOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme ,Button} from 'antd';

const {Header,  Content, Sider } = Layout;
type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({children}:Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [header, setHeader] = useState("Báo cáo");
  const { isLoading, currentUser,login }: { isLoading: boolean, currentUser: any ,login : any} = useCookie();
  useEffect(() => {
    // Define your handleLogin function
    const handleLogin = async () => {
        try {
            // Call the login function
            const response = await login({
              username: 'administrator',
              password: '123'
          }); // Assuming login returns a promise
            console.log(response); // Log the response from the login function
        } catch (error) {
            console.error(error); // Log any errors that occur during login
        }
    };

    // Call handleLogin when the component mounts
    handleLogin();

    // Clean up function (optional)
    return () => {
        // Perform any cleanup if needed
    };
}, []);
  const navigate = useNavigate();
  const handleItemClick = (itemName: string,header: string) => {
    console.log(`Item clicked: ${itemName}`);
    setHeader(header)
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
    getItem('Báo cáo', '1', <PieChartOutlined />, () => handleItemClick('/',"Báo cáo")),
    ...(!isLoading && currentUser === 'Administrator' ? [getItem('Nhân viên', '2', <UserOutlined />, () => handleItemClick('/router-employee',"Nhân viên"))] : []),
    // getItem('Nhân viên', '2', <UserOutlined />, () => handleItemClick('/router-employee',"Nhân viên")),
    getItem('Danh mục', 'sub1', <BarsOutlined />, undefined, [
        getItem('Sản phẩm', '3', undefined, () => handleItemClick('/router-product_sku',"Sản phẩm")),
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
      <Menu.Item key="setting" icon={<SettingOutlined />}>
        <a href="/">Cài đặt</a>
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
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Row justify="space-between" align="middle">
        <Col md ={18}>
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
        </Col>
        <Col md={6} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20px',height:'35px' }}>
  <Dropdown overlay={UserProfileMenu} trigger={['click']} placement="bottomRight" overlayStyle={{ marginTop: '8px' }}>
    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
      <Avatar icon={<UserOutlined />} />
      <span style={{ marginLeft: '8px' }}>{currentUser ? currentUser : "Administrator"}</span>
    </div>
  </Dropdown>
</Col>
      </Row>
        
           
           
          
        </Header>
      {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>{header}</Breadcrumb.Item>
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
