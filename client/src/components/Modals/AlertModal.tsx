import React, { useState} from 'react';
import {Modal, Button} from 'antd';


type Props = {
    text:string,
    buttonText:any,
    OkFunction?:Function,
}

const AlertModal:React.FC<Props> = ({text,buttonText,OkFunction}) => {

    const [visible,setVisible]= useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        if (OkFunction){
            OkFunction()
        }
        setVisible(false)
    };

    const handleCancel = () => {
        setVisible(false);
    };


    return (
        <div>
            <Button onClick={showModal} shape={"round"}>
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