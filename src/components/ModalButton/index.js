import React, { useState } from 'react';
import { Modal, Button, Form } from 'antd';
import FormAddClassroom from "../FormAddClassroom";

const ModalButton = ({ name,callBack}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const setSubmitForm = () => {
        setIsModalVisible(false);
    }

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalVisible(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                {name}
            </Button>
            <Modal title="New Classroom"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <FormAddClassroom form={form} setSuccess = {setSubmitForm} onSuccess={callBack} onFailed={onFinishFailed}/>
            </Modal>
        </>
    );
}

export default ModalButton;