import React, {useContext, useState} from 'react';
import {Button, Input, Modal} from "antd";
import {EstimationUsersStyledComponent, ModalContainer} from "../../assets/styledComponents/styledComponents";
import {ProjectOutlined} from '@ant-design/icons';
import {ApplicationContext} from "../../context/ApplicationContext";


type Props = {
    editUserStoryEstimation:Function,
    estimatedUsers:{[key:string]:number}
    getUserName:Function
};

const EstimationModal:React.FC<Props> = ({editUserStoryEstimation,estimatedUsers,getUserName}) => {

    const appContext = useContext(ApplicationContext);
    const [visible, setVisible] = useState(false);
    const[showEstimationValues,setShowEstimationValues] = useState<boolean>(false);

    const estimationModalFooter = (<div>
        <Button onClick={e => handleCancel(e)}> Close </Button>
        <Button type={"primary"} onClick={e => {handleOk(e)}} > Save </Button>
    </div>);



    function isEstimated(){
        return estimatedUsers[appContext.getUserId()] !== undefined;
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
                title={isEstimated()?"Estimations:":"Estimate to see other estimations and average!"}
                visible={visible}
                footer={estimationModalFooter}
                onCancel={handleCancel}

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
                                    <div className={"estimation-user"}>{getUserName(k[0])}</div>
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