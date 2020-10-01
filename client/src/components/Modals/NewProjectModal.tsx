import React, {useState} from 'react';
import {Modal, Button} from 'antd';
import "../../assets/ModalStyle.css";
import { PlusOutlined } from '@ant-design/icons';

const NewProjectModal = () => {

    const [visible, setVisible] = useState(false);

    const showModal = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setVisible(!visible);
    };

    const handleSave = (e:React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setVisible(!visible);
    };

    const handleCancel = (e:React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setVisible(false);
    };

    return (
        <div onClick={event => {event.stopPropagation()}} className={"Modal"} style={{}}>
            <Button shape={"round"} icon={<PlusOutlined />} type={"primary"}onClick={event => {
                showModal(event)
            }}>
                Add new Project
            </Button>
            <Modal
                title="Basic Modal"
                visible={visible}
                onOk={e => {handleSave(e)}}
                onCancel={e => handleCancel(e)}

            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    )
};

export default NewProjectModal;