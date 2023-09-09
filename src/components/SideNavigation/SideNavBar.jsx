import React, { useState, useEffect } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    EditOutlined,
    LogoutOutlined,
    InstagramFilled
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Avatar } from 'antd';
const { Header, Sider, Content } = Layout;
import { useNavigate } from 'react-router';
import { Route, Routes, useLocation } from 'react-router-dom';
import ViewPostCard from '../ViewPost/ViewPost';
import CreatePostForm from '../CreatePost/CreatePost';
import PersonInfo from '../ProfileInfo/ProfileInfo';


function SideBar({ props }) {
    const navigate = useNavigate();
    const location = useLocation().pathname.split("/").pop();
    console.log(location);
    return (
        <Sider trigger={null} collapsible collapsed={props}>
            <div className="demo-logo-vertical" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[location]}
                onClick={({ key }) => {
                    navigate(key);
                }}
                items={[
                    {
                        icon: <InstagramFilled />,
                        label: 'View Posts',
                        key: 'view-post'
                    },
                    {
                        icon: <EditOutlined />,
                        label: 'Create Post',
                        key: 'create-post'
                    },
                    {
                        icon: <UserOutlined />,
                        label: 'Profile',
                        key: 'profile'
                    },
                    {
                        icon: <LogoutOutlined />,
                        label: 'Logout',
                        key: 'logout',
                        type: 'error'
                    }
                ]}
            />
        </Sider>);
}


const SideNavBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <div>
            <Layout>
                <SideBar props={collapsed} />
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                            display: 'flex', // Set display to flex
                            justifyContent: 'space-between', // Space out items
                            alignItems: 'center', // Align items vertically in the center
                        }}
                    >
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
                        <Avatar style={{ marginRight: '20px' }} shape="square" size="small" icon={<UserOutlined />} />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: colorBgContainer,
                            minHeight: '100vh'
                        }}
                    >
                        <Routes>
                            <Route path="view-post" element={<ViewPostCard />} />
                            <Route path="create-post" element={<CreatePostForm />} />
                            <Route path="profile" element={<PersonInfo />} />
                            <Route path="logout" element={<div>Logout</div>} />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </div >
    );
};
export default SideNavBar;
