import React from 'react';
import { Form, Input } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const FormAddClassroom = ({ form, setSuccess, onSuccess, onFailed }) => {
    // const handleCancel = () => {
    //     form.resetFields();
    // };
    const handleSubmit = async (values) => {
        const jsonBody = {
            name: values.name,
            section: values.section,
            topic: values.topic,
            room: values.room
        }
        axios
            .post('https://classroom-ex-04.herokuapp.com/classroom', jsonBody)
            .then(response => {
                onSuccess(jsonBody);
                setSuccess();
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
        form.resetFields();
    }
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            onFinishFailed={onFailed}
        >
            <Form.Item
                name="name"
                label="Tên lớp học"
                required tooltip="Đây là thông tin bắt buộc"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập tên lớp học!',
                    },
                ]}>
                <Input placeholder="Nhập tên lớp học" />
            </Form.Item>
            <Form.Item
                name="topic"
                label="Chủ đề"
                required tooltip="Đây là thông tin bắt buộc"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập tên chủ đề!',
                    },
                ]}
            >
                <Input placeholder="Nhập chủ đề lớp học" />
            </Form.Item>
            <Form.Item
                name="section"
                label="Phần"
                tooltip={{
                    title: 'Đang phát triển',
                    icon: <InfoCircleOutlined />,
                }}
            >
                <Input placeholder="Nhập phần" />
            </Form.Item>
            <Form.Item
                name="room"
                label="Phòng"
                tooltip={{
                    title: 'Phòng học',
                    icon: <InfoCircleOutlined />,
                }}
            >
                <Input placeholder="Nhập phòng học" />
            </Form.Item>
        </Form>
    );
}

export default FormAddClassroom;