import React, { useState, useEffect, useContext } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Spin, Alert, Row, Col } from 'antd';
import { UserAuthContext } from '../../Context/UserAuthContext';
import './ViewPost.css';
const { Meta } = Card;

const ViewPostCard = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authState } = useContext(UserAuthContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.API_BASE_URL}/post`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${authState.token.token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }

                const data = await response.json();
                setPosts(data);
                console.log(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    return (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <div className="loader">
                {loading && <Spin tip="Loading post..." size="large" />}
                {error && <Alert message={error} type="error" showIcon />}
            </div>
            {posts.map((post) => {
                return (
                    <Col key={post.id} span={24} style={{ marginBottom: '20px' }}>
                        <Card

                            style={{
                                width: 500,
                                margin: 'auto'
                            }}
                            cover={
                                <img
                                    alt={post.caption}
                                    src={post.image}
                                />
                            }
                            actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                                title={post.title}
                                description={post.description}
                            />
                        </Card>
                    </Col>
                );
            })}
        </Row>
    );
};

export default ViewPostCard;