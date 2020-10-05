import React, {Dispatch, SetStateAction, useState} from 'react';
import {Modal, Button, Input} from 'antd';
import "../../assets/ModalStyle.css";
import { PlusOutlined, ProjectOutlined } from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import TextArea from "antd/es/input/TextArea";

interface Props {
    projectId:number

}

const NewTaskModal:React.FC<Props>= ({projectId}) => {

    const [visible, setVisible] = useState(false);
    const[UserStory, setUserStory ] = useState("");
    const[BusinessValue, setBusinessValue ] = useState(0);
    const[OwnerId, setOwnerId ] = useState<number|null>(null);
    const[Estimation, setEstimation] = useState(0);

    const history= useHistory();

    const showModal = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setVisible(!visible);
    };

    const handleSave = (e:React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (UserStory.length>2){
            setVisible(!visible);
        }else alert("Project name must be 3 character long!")

    };

    const handleCancel = (e:React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setVisible(false);
    };



    return (
        <div onClick={event => {event.stopPropagation()}} className={"modal"} style={{}}>
            <Button shape={"round"} icon={<PlusOutlined />} type={"primary"} onClick={event => {
                showModal(event)
            }}>
                Add new Task
            </Button>
            <Modal
                title="Create new project"
                visible={visible}
                onOk={e => {handleSave(e)}}
                onCancel={e => handleCancel(e)}

            >
                <div className={"newProjectForm"}>
                    <Input.TextArea placeholder={"User Story"}
                           onChange={event => {setUserStory(event.target.value)}}
                    />
                    <Input placeholder={"Business value"} prefix={<ProjectOutlined />}  type={"number"}
                           onChange={event => {setBusinessValue(event.target.valueAsNumber)}}
                    />
                    <Input placeholder={"Owner"} prefix={<ProjectOutlined />}  type={"number"}
                           onChange={event => {setOwnerId(event.target.valueAsNumber)}}
                    />
                    <Input placeholder={"Estimation"} prefix={<ProjectOutlined />}  type={"number"}
                           onChange={event => {setEstimation(event.target.valueAsNumber)}}
                    />
                </div>

            </Modal>
        </div>
    )
};

export default NewTaskModal;