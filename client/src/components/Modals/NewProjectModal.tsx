import React, {Dispatch, SetStateAction, useState} from 'react';
import {Modal, Button, Input} from 'antd';
import "../../assets/ModalStyle.css";
import { PlusOutlined, ProjectOutlined } from '@ant-design/icons';
import ProjectService from "../../services/ProjectService";
import {useHistory} from "react-router-dom";

interface Props {
    companyId:number
    setDisplay:Dispatch<SetStateAction<boolean>>
}

const NewProjectModal:React.FC<Props>= ({companyId,setDisplay}) => {

    const [visible, setVisible] = useState(false);
    const[projectName, setProjectName ] = useState("");
    const history= useHistory();

    const showModal = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setDisplay(false);
        setVisible(!visible);
    };

    const handleSave = (e:React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (projectName.length>2){
            let projectId = ProjectService.saveNewProject(projectName,companyId);
            setVisible(!visible);
            history.push("/project/"+projectId);
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
                Add new Project
            </Button>
            <Modal
                title="Create new project"
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