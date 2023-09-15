import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useContext } from 'react';
import './CreatePost.css';
import {
    Button,
    Form,
    Input,
    Upload,
    message
} from 'antd';
import { UserAuthContext } from '../../Context/UserAuthContext';
const { TextArea } = Input;



const CreatePostForm = () => {
    const [form] = Form.useForm();
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [description, setDescription] = useState('');
    const [fileList, setFileList] = useState([]);
    const { authState } = useContext(UserAuthContext);
    const handleSubmit = async () => {
        message.loading('Creating Post....')
        const formData = new FormData();
        formData.append('title', title);
        formData.append('caption', caption);
        formData.append('description', description);

        if (fileList.length > 0) {
            formData.append('file', fileList[0].originFileObj);
        }

        try {
            const response = await fetch(`${process.env.API_BASE_URL}/post/`, {
                method: 'POST',
                body: formData,
                headers: {
                    "Authorization": `Bearer ${authState.token.token}`
                }
            });

            if (response.ok) {
                message.success("Post created successfully!");
                setTitle('');
                setCaption('');
                setDescription('');
                setFileList([]);
                form.resetFields();
            } else {
                console.log('Failed:', response);
                message.error(
                    "Post cannot be created!"
                );
            }
        } catch (error) {
            console.error('Error:', error);
            message.error("Post cannot be created !")
        }
    };

    return (
        <>
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
                        minWidth: '360px',
                        maxWidth: '600px',
                        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.05)",
                        padding: '25px',
                        borderRadius: '2%'
                    }}
                    onFinish={handleSubmit}
                >
                    <Form.Item label="Title">
                        <Input name="title" value={title} onChange={e => setTitle(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Caption">
                        <TextArea name="caption" rows={2} value={caption} onChange={e => setCaption(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Content">
                        <TextArea name="description" rows={4} value={description} onChange={e => setDescription(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Post Image">
                        <Upload
                            name="file"
                            beforeUpload={(file) => {
                                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
                                if (!isJpgOrPng) {
                                    message.error('You can only upload JPG, JPEG, PNG files!');
                                    return false;
                                }
                                return true;
                            }}
                            listType="picture-card"
                            fileList={fileList}
                            onChange={({ fileList }) => setFileList(fileList.slice(-1))} // Keep only the last selected file
                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 4 }}>Upload</div>
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
        </>
    );
};

export default CreatePostForm;
