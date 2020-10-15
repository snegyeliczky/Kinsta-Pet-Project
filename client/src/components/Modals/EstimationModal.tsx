import React, {useState} from 'react';
import {Button, Input, Modal} from "antd";
import {EstimationUsersStyledComponent, ModalContainer} from "../../assets/styledComponents/styledComponents";
import {ProjectOutlined} from '@ant-design/icons';


type Props = {
    editUserStoryEstimation:Function,
    estimatedUsers:{[key:number]:number}
};

const EstimationModal:React.FC<Props> = ({editUserStoryEstimation,estimatedUsers}) => {

    const [visible, setVisible] = useState(false);
    const[showEstimationValues,setShowEstimationValues] = useState<boolean>(false);



    function getUserId() {
        return parseInt(localStorage.getItem("userId")!);
    }

    function isEstimated(){
        return estimatedUsers[getUserId()] !== undefined;

    }

    function showModal(event: React.MouseEvent<HTMLElement>) {
        setVisible(true)
    }

    function handleOk(e: React.MouseEvent<HTMLElement>) {
        setShowEstimationValues(!showEstimationValues);
    }

    function handleCancel(e: React.MouseEvent<HTMLElement>) {
        setVisible(false)
    }

    function setEstimation(valueAsNumber: number) {
        if (valueAsNumber>0){
            editUserStoryEstimation(valueAsNumber);
        }
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
                onOk={e => {handleOk(e)}}
                onCancel={e => handleCancel(e)}

            >
                <div className={"newEstimation"}>
                    <Input placeholder={"Estimation"} prefix={<ProjectOutlined />}  type={"number"}
                           onChange={event => {setEstimation(event.target.valueAsNumber)}}
                    />
                </div>
                {isEstimated()?
                    <EstimationUsersStyledComponent>
                        <div className={"estimation-user"}>User</div>
                        <div className={"estimation-estimation"}>Estimation</div>
                        {
                            Object.entries(estimatedUsers).map((k)=>{
                                return <>
                                    <div className={"estimation-user"}>{k[0]}</div>
                                    <div className={"estimation-estimation"}>{k[1]}-SP</div>
                                </>
                            })
                        }
                    </EstimationUsersStyledComponent>
                    :""}

            </Modal>
        </ModalContainer>
    );
};

export default EstimationModal;