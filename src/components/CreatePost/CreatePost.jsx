import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import './CreatePost.css';
import {
    Button,
    Form,
    Input,
    Upload,
} from 'antd';

const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const CreatePostForm = () => {

    return (
        <div>
            <Form
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                layout="horizontal"
                style={{
                    width: '600px',
                    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.05)",
                    padding : '25px',
                    borderRadius : '2%'
                }}
            >
                <Form.Item label="Title">
                    <Input />
                </Form.Item>
                <Form.Item label="Caption">
                    <TextArea rows={2} />
                </Form.Item>
                <Form.Item label="Content">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Post Image" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 4,
                                }}
                            >
                                Upload
                            </div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{
                    offset: 10,
                    span: 24
                }}>
                    <Button type="primary" htmlType="submit">Post</Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default CreatePostForm;