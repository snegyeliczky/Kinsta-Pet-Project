import React, {useState} from 'react';
import {Button, Input, Modal} from "antd";
import {ModalContainer} from "../../assets/styledComponents/styledComponents";
import {ProjectOutlined} from '@ant-design/icons';

type Props = {
    editUserStoryEstimation:Function,
};

const EstimationModal:React.FC<Props> = ({editUserStoryEstimation}) => {

    const [visible, setVisible] = useState(false);

    function showModal(event: React.MouseEvent<HTMLElement>) {
        setVisible(true)
    }

    function handleSave(e: React.MouseEvent<HTMLElement>) {
        setVisible(false)
    }

    function handleCancel(e: React.MouseEvent<HTMLElement>) {
        setVisible(false)
    }

    function setEstimation(valueAsNumber: number) {
            editUserStoryEstimation(valueAsNumber);
    }

    return (
        <ModalContainer onClick={event => {event.stopPropagation()}} style={{}}>
            <Button shape={"round"} type={"primary"} onClick={event => {
                showModal(event)
            }}>
                Estimation
            </Button>
            <Modal
                title="Estimate to see other estimations and average!"
                visible={visible}
                onOk={e => {handleSave(e)}}
                onCancel={e => handleCancel(e)}

            >
                <div className={"newEstimation"}>
                    <Input placeholder={"Estimation"} prefix={<ProjectOutlined />}  type={"number"}
                           onChange={event => {setEstimation(event.target.valueAsNumber)}}
                    />
                </div>

            </Modal>
        </ModalContainer>
    );
};

export default EstimationModal;