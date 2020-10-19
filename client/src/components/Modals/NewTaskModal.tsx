import React, {Dispatch, SetStateAction, useState} from 'react';
import {Button, Input, Modal} from "antd";
import {ModalContainer} from "../../assets/styledComponents/styledComponents";
import {PlusOutlined, ProjectOutlined} from '@ant-design/icons';
import {TaskModel} from "../../interfaces/TaskModel";
import TaskService from "../../services/TaskService";

type Props = {
    UserStoryId: number
    setTasks: Dispatch<SetStateAction<TaskModel[]>>
}

const NewTaskModal: React.FC<Props> = ({UserStoryId, setTasks}) => {

    const [visible, setVisible] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [OwnerId, setOwnerId] = useState<string | null>(null);
    const [time, setTime] = useState<string>();

    function showModal(event: React.MouseEvent<HTMLElement>) {
        setVisible(true)
    }

    function creatNewTask(): TaskModel {
        return {
            id: "",
            userStoryId: UserStoryId,
            title: taskTitle,
            description: taskDescription,
            ownerId: OwnerId,
            time: time,
            ready: false
        }
    }

    function handleCancel(e: React.MouseEvent<HTMLElement>) {
        setVisible(false);
    }

    function handleSave(e: React.MouseEvent<HTMLElement>) {
        let newTask = creatNewTask();
        let tasks = TaskService.saveNewTask(newTask);
        setTasks(tasks);
        setVisible(false);
    }


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
                        <Input placeholder={"Task owner"} prefix={<ProjectOutlined/>} type={"text"}
                               onChange={event => {
                                   setOwnerId(event.target.value)
                               }}
                        />
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