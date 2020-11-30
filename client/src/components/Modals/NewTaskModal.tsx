import React, {useContext, useState} from 'react';
import {Button, Input, Modal, message} from "antd";
import {ModalContainer} from "../../assets/styledComponents/styledComponents";
import {PlusOutlined, ProjectOutlined} from '@ant-design/icons';
import UserDropdown from "../userDropdown";
import ProjectContext from "../../context/ProjectContext";
import {ApplicationContext} from "../../context/ApplicationContext";
import {useMutation, useQuery} from "@apollo/client";
import {addNewTask, getTaskForUserStory} from "../../queries/taskQueries";
import {getUserById} from "../../queries/userQueries";

type Props = {
    UserStoryId: number
}

const NewTaskModal: React.FC<Props> = ({UserStoryId}) => {

    const appContext = useContext(ApplicationContext);
    const projectContext = useContext(ProjectContext);
    const [visible, setVisible] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [ownerId, setOwnerId] = useState<number | null>(appContext.getUserIdAsNumber());
    const [time, setTime] = useState<string>("00:00");
    const [addNewTaskMutation] = useMutation(addNewTask);

    const {data, loading} = useQuery(getUserById, {variables: {id: appContext.getUserIdAsNumber()}});

    function showModal(event: React.MouseEvent<HTMLElement>) {
        setVisible(true)
    }

    function saveNewTask() {
        addNewTaskMutation({
            variables: {
                userStoryId: UserStoryId,
                taskTitle: taskTitle,
                taskDescription: taskDescription,
                ownerId: ownerId,
                time: time
            },
            refetchQueries: [{query: getTaskForUserStory, variables: {id: UserStoryId}}]
        })

    }


    function handleCancel(e: React.MouseEvent<HTMLElement>) {
        setVisible(false);
    }

    function handleSave(e: React.MouseEvent<HTMLElement>) {
        if (taskTitle.length > 2) {
            saveNewTask();
            setVisible(false);
        } else message.error("Task title must be minimum 3 character long!", 5)
    }


    if (loading) return (<div>Loading...</div>);


    return (
        <div>
            <ModalContainer onClick={event => {
                event.stopPropagation()
            }} style={{}}>
                <Button shape={"round"} icon={<PlusOutlined/>} type={"primary"} onClick={event => {
                    showModal(event)
                }}>
                    Add new Task
                </Button>
                <Modal
                    title="Create new project"
                    visible={visible}
                    onCancel={e => {
                        handleCancel(e)
                    }}
                    onOk={e => {
                        handleSave(e)
                    }}
                >
                    <div className={"newProjectForm"}>
                        <Input placeholder={"Task title"} prefix={<ProjectOutlined/>} type={"string"}
                               onChange={event => {
                                   setTaskTitle(event.target.value)
                               }}
                        />
                        <Input.TextArea placeholder={"Task Description"}
                                        onChange={event => {
                                            setTaskDescription(event.target.value)
                                        }}
                        />
                        <UserDropdown userData={projectContext.participants} onChange={setOwnerId}
                                      base={data.user.firstName}/>
                        <Input type={"time"} onChange={event => {
                            setTime(event.target.value)
                        }}/>
                    </div>

                </Modal>
            </ModalContainer>

        </div>
    );
};

export default NewTaskModal;