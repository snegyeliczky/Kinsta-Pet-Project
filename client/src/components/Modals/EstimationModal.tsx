import React, {useContext, useState} from 'react';
import {Button, Input, Modal} from "antd";
import {EstimationUsersStyledComponent, ModalContainer} from "../../assets/styledComponents/styledComponents";
import {ProjectOutlined} from '@ant-design/icons';
import {UserEstimation} from "../../Types/UserEstimation";
import {ApplicationContext} from "../../context/ApplicationContext";


type Props = {
    editUserStoryEstimation: Function,
    estimatedUsers: UserEstimation[] | null
};

const EstimationModal: React.FC<Props> = ({editUserStoryEstimation, estimatedUsers}) => {

    const [visible, setVisible] = useState(false);
    const appContext = useContext(ApplicationContext);
    const [newEstimation, setNewEstimation] = useState<number>();

    const estimationModalFooter = (<div>
        <Button onClick={e => handleCancel(e)}> Close </Button>
        <Button type={"primary"} onClick={e => {
            handleOk(e)
        }}> ok </Button>
    </div>);

    function isEstimated() {
        return estimatedUsers?.some((estimation) => {
            return parseInt(estimation.owner.id) === appContext.getUserIdAsNumber()
        });
    }

    function showModal(event: React.MouseEvent<HTMLElement>) {
        setVisible(true)
    }

    function handleOk(e: React.MouseEvent<HTMLElement>) {
        if (isEstimated()) {
            setVisible(false)
        } else {
            editUserStoryEstimation(newEstimation);
        }
    }

    function handleCancel(e: React.MouseEvent<HTMLElement>) {
        setVisible(false)
    }

    function setEstimation(valueAsNumber: number) {
        if (isEstimated()) {
            if (valueAsNumber > 0) {
                editUserStoryEstimation(valueAsNumber);
            }
        }
        else {
            if (valueAsNumber>0) setNewEstimation(valueAsNumber);
        }
    }

    return (
        <ModalContainer onClick={event => {
            event.stopPropagation()
        }} style={{}}>
            <Button shape={"round"} type={"primary"} onClick={event => {
                showModal(event)
            }}>
                Estimation
            </Button>
            <Modal
                title={isEstimated() ? "Estimations:" : "Estimate to see other estimations and average!"}
                visible={visible}
                footer={estimationModalFooter}
                onCancel={handleCancel}

            >
                <div className={"newEstimation"}>
                    <Input placeholder={"Estimation"} prefix={<ProjectOutlined/>} type={"number"}
                           onChange={event => {
                               setEstimation(event.target.valueAsNumber)
                           }}
                    />
                </div>
                {isEstimated() ?
                    <EstimationUsersStyledComponent>
                        <div className={"estimation-user"}>User</div>
                        <div className={"estimation-estimation"}>Estimation</div>
                        {
                            estimatedUsers ? estimatedUsers.map((k) => {
                                    return <>
                                        <div key={k.owner.id+k.estimation} className={"estimation-user"}>{k.owner.firstName}</div>
                                        <div key={k.id} className={"estimation-estimation"}>{k.estimation}-SP</div>
                                    </>
                                })
                                : ""
                        }
                    </EstimationUsersStyledComponent>
                    : ""}

            </Modal>
        </ModalContainer>
    );
};

export default EstimationModal;