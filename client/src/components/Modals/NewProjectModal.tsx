import React, {useState} from 'react';
import {Modal, Button, Input} from 'antd';
import "../../assets/ModalStyle.css";
import { PlusOutlined, ProjectOutlined } from '@ant-design/icons';
import ProjectService from "../../services/ProjectService";

interface Props {
    companyId:number
}

const NewProjectModal:React.FC<Props>= ({companyId}) => {

    const [visible, setVisible] = useState(false);
    const[projectName, setProjectName ] = useState("");

    const showModal = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setVisible(!visible);
    };

    const handleSave = (e:React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (projectName.length>2){
            ProjectService.saveNewProject(projectName,companyId);
            setVisible(!visible);
        }else alert("Project name must be 3 character long!")

    };

    const handleCancel = (e:React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setVisible(false);
    };



    return (
        <div onClick={event => {event.stopPropagation()}} className={"Modal"} style={{}}>
            <Button shape={"round"} icon={<PlusOutlined />} type={"primary"} onClick={event => {
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
                <div className={"newProjectForm"}>
                    <Input placeholder={"Project name"} prefix={<ProjectOutlined />}  type={"string"}
                           onChange={event => {setProjectName(event.target.value)}}
                    />

                </div>

            </Modal>
        </div>
    )
};

export default NewProjectModal;