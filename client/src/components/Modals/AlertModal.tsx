import React, {useState} from 'react';
import {Modal, Button} from 'antd';


type Props = {
    text: string,
    buttonText: any,
    OkFunction?: Function,
    success?: boolean
}

const AlertModal: React.FC<Props> = ({text, buttonText, OkFunction, success}) => {

    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        if (OkFunction) {
            OkFunction()
        }
        setVisible(false)
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <div className={"alert_modal"} style={{margin: "10px"}}>
            <Button onClick={showModal} shape={"round"} type={"primary"} danger={success ? false : true}>
                {buttonText}
            </Button>
            <Modal

                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <h2>{text}</h2>
            </Modal>
        </div>
    );
};

export default AlertModal;