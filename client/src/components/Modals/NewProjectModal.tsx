import React, { useContext, useState} from 'react';
import {Modal, Button, Input} from 'antd';
import {PlusOutlined, ProjectOutlined} from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import {ModalContainer} from "../../assets/styledComponents/styledComponents";
import {ApplicationContext} from "../../context/ApplicationContext";
import {useMutation} from "@apollo/client";
import {addNewProject} from "../../queries/projectQueries";
import { getProjectsForCompanyByUser} from "../../queries/companyQueries";

interface Props {
    companyId: number
}

const NewProjectModal: React.FC<Props> = ({companyId}) => {

    const [visible, setVisible] = useState(false);
    const [projectName, setProjectName] = useState("");
    const history = useHistory();
    const appContext = useContext(ApplicationContext);
    const [saveNewProject] = useMutation(addNewProject);

    const showModal = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setVisible(!visible);
    };

    const handleSave = async (e: React.MouseEvent<HTMLElement>, go: boolean) => {
        e.stopPropagation();
        if (projectName.length <= 2) {
            alert("Project name must be 3 character long!")
        } else {
            let newProject = await saveNewProject(
                {
                    variables: {
                        userId: appContext.getUserIdAsNumber(),
                        companyId: companyId,
                        projectName: projectName
                    },
                    refetchQueries: [{
                        query: getProjectsForCompanyByUser,
                        variables: {
                            userId: appContext.getUserIdAsNumber(),
                            companyId: companyId
                        }
                    }]
                });
            setVisible(!visible);
            if (go) history.push("/app/project/" + newProject.data.addNewProject.id);
        }

    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setVisible(false);
    };

    const footer = (<div>
        <Button type={"primary"} danger onClick={e => handleCancel(e)}>cancel</Button>
        <Button type={"primary"} onClick={e => {
            handleSave(e, false)
        }}>Save and stay </Button>
        <Button type={"primary"} onClick={e => {
            handleSave(e, true)
        }}>Save and go</Button>
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
                onCancel={e => {
                    handleCancel(e)
                }}
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