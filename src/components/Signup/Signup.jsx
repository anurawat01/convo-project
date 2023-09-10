import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Button, Checkbox, Divider, Form, Input, Typography } from 'antd';
const { Link } = Typography;


const SignupPage = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                    height: 600,
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
                    <Input />
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
                    <Input />
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
                    <Input.Password />
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
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" ghost>
                        Signup
                    </Button>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Facebook Signup
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
            </Form>
        </div>
    );
};

export default SignupPage;
