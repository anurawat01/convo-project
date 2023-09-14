import React, { useState, useEffect, useContext } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Button, Checkbox, Divider, Form, Input, Typography, Alert, message } from 'antd';
import { useNavigate } from 'react-router';
import './Login.css';
import { UserAuthContext } from '../../Context/UserAuthContext';

const { Link } = Typography;

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(UserAuthContext);

    const onFinish = async () => {
        setLoading(true);

        const data = {
            username: username,
            password: password
        };
        const url = `${process.env.API_BASE_URL}/auth/login`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch(url, options);
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                login(responseData);
                message.success("Authenticated !")
                navigate("/dashboard");
            } else {
                setError(response.statusText);
                console.log(response);
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                setError(error.response.data);
            } else {
                setError('Failed to login. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = () => {
        setError('Form validation failed. Please check your input.');
    };
    useEffect(() => {
        window.addEventListener('message', (event) => {
            if (event.data.status === 'success') {
                message.success("Authenticated ! Redirecting to Dashboard...")
                const token = event.data.token;
                login(token);
                navigate("/dashboard");
            }
        }, false);
    }, []);

    const handleFbLogin = async () => {
        setLoading(true);
        const url = `${process.env.API_BASE_URL}/auth/facebook`;
        window.open(url, 'facebook-login');
    }

    return (
        <div className="form-container">
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 20 }}
                style={{
                    padding: 60,
                    height: 600,
                    width: 600,
                    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)'
                }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <Divider>
                        <Typography.Title level={1} style={{ margin: 0 }} type="secondary">
                            Login
            </Typography.Title>
                    </Divider>
                </div>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" ghost disabled={loading}>
                        {loading ? 'Loading...' : 'Login'}
                    </Button>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                    shouldUpdate={true}
                >

                    <Button
                        type="default"
                        onClick={handleFbLogin}
                    >
                        Login with Facebook
                            </Button>

                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <ReactLink to='/signup'>
                        <Link italic>Dont have an account?</Link>
                    </ReactLink>
                </Form.Item>
                {error && <Alert message={error} type="error" showIcon closable />}
            </Form>
        </div>
    );
};

export default LoginPage;
