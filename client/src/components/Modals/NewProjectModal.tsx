import React, {Dispatch, SetStateAction, useContext, useState} from 'react';
import {Modal, Button, Input} from 'antd';
import {PlusOutlined, ProjectOutlined} from '@ant-design/icons';
import ProjectService from "../../localServices/ProjectService";
import {useHistory} from "react-router-dom";
import {Project} from "../../interfaces/Project";
import {ModalContainer} from "../../assets/styledComponents/styledComponents";
import {ApplicationContext} from "../../context/ApplicationContext";

interface Props {
    companyId: number
    setDisplay?: Dispatch<SetStateAction<boolean>>
    setProjects: Dispatch<SetStateAction<Project[]>>
}

const NewProjectModal: React.FC<Props> = ({companyId, setDisplay, setProjects}) => {

    const [visible, setVisible] = useState(false);
    const [projectName, setProjectName] = useState("");
    const history = useHistory();
    const appContext = useContext(ApplicationContext);

    const showModal = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setVisible(!visible);
    };


    const handleSave = (e: React.MouseEvent<HTMLElement>, go:boolean) => {
        e.stopPropagation();
        if (projectName.length > 2) {
            let projects = ProjectService.saveNewProject(projectName, companyId,appContext.getUserId());
            setProjects(projects);
            let newProjectId = projects.reduce((re, project) => {
                if (project.name === projectName) {
                    re = project.id
                }
                return re;
            }, 0);
            setVisible(!visible);
            if (go) history.push("/app/project/" + newProjectId);
        } else alert("Project name must be 3 character long!")

    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setVisible(false);
    };

    const footer = (<div>
        <Button type={"primary"} danger onClick={e => handleCancel(e)}>cancel</Button>
        <Button type={"primary"} onClick={e => { handleSave(e,false) }}>Save and stay </Button>
        <Button type={"primary"} onClick={e => { handleSave(e,true) }}>Save and go</Button>
    </div>);


    return (
        <ModalContainer onClick={event => {
            event.stopPropagation()
        }} style={{}}>
            <Button shape={"round"} icon={<PlusOutlined/>} type={"primary"} onClick={event => {
                showModal(event)
            }}>
                Add new Project
            </Button>
            <Modal
                title="Create new project"
                visible={visible}
                onCancel={e=>{handleCancel(e)}}
                footer={footer}

            >
                <div className={"newProjectForm"}>
                    <Input placeholder={"Project name"} prefix={<ProjectOutlined/>} type={"string"}
                           onChange={event => {
                               setProjectName(event.target.value)
                           }}
                    />

                </div>

            </Modal>
        </ModalContainer>
    )
};

export default NewProjectModal;