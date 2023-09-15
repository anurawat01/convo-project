import React, { useState, useEffect } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Button, Checkbox, Divider, Form, Input, Typography, Alert, message } from 'antd';
const { Link } = Typography;


const SignupPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();


    const validateFormFields = () => {
        if (password !== confirmPassword) {
            setError('Password doesn\'t match');
            return false;
        }
        return true;
    };

    const makeApiRequest = async () => {
        const data = {
            name: fullname,
            username,
            password,
        };
        const url = `${process.env.API_BASE_URL}/auth/register`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch(url, options);
            if (response.ok) {
                message.success('User Created! Navigating to Login Page')
                navigate("/");
                return true;
            } else {
                const errorData = await response.json();
                setError(errorData.message || response.statusText);
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to Signup. Please try again.');
            return false;
        }
    };

    const onFinish = async () => {
        setLoading(true);

        if (!validateFormFields()) {
            setLoading(false);
            return;
        }

        await makeApiRequest();

        setLoading(false);
    };

    useEffect(() => {
        window.addEventListener('message', (event) => {
            if (event.data.status === 'success') {
                message.success("Authenticated ! Redirecting to dashboard...")
            }
        }, false);
    }, []);

    const handleFbSignup = async () => {
        setLoading(true);
        const url = `${process.env.API_BASE_URL}/auth/facebook`;
        window.open(url, 'facebook-login', 'width=800,height=600');
    }

    const onFinishFailed = () => {
        setError('Form submission failed. Please check your input.');
    };

    return (
        <div className="form-container">

            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 20,
                }}
                style={{
                    padding: 30,
                    minHeight: 600,
                    width: 600,
                    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)'
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <Divider>
                        <Typography.Title level={1} style={{ margin: 0 }} type="secondary">
                            Signup
                    </Typography.Title>
                    </Divider>
                </div>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input defaultValue={fullname} onChange={(e) => setFullname(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input defaultValue={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password defaultValue={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" ghost disabled={loading}>
                        {loading ? 'Loading...' : 'Signup'}
                    </Button>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button onClick={handleFbSignup} type="primary">
                        Facebook Login
                    </Button>
                </Form.Item>
                <Form.Item wrapperCol={{
                    offset: 8,
                    span: 16,
                }}>
                    <ReactLink to='/'>
                        <Link italic>Already have an account ?</Link>
                    </ReactLink>
                </Form.Item>
                {error && <Alert message={error} type="error" showIcon closable />}
            </Form>


        </div>
    );
};

export default SignupPage;
