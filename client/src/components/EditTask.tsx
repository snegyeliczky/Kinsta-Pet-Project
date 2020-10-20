import React, {Dispatch, SetStateAction, useContext, useState} from 'react';
import {TaskStyledComponent} from "../assets/styledComponents/styledComponents";
import {Input} from "antd";
import AlertModal from "./Modals/AlertModal";
import {TaskModel} from "../interfaces/TaskModel";
import {DeleteOutlined, SettingOutlined} from '@ant-design/icons';
import TaskService from "../services/TaskService";
import {ApplicationContext} from "../context/ApplicationContext";
import UserDropdown from './userDropdown';
import ProjectContext from "../context/ProjectContext";

type props = {
    Task: TaskModel,
    removeTask: Function,
    edit: boolean,
    setEdit: Dispatch<SetStateAction<boolean>>,
    ready: boolean,
    setTasks: Dispatch<SetStateAction<TaskModel[]>>,
}


const EditTask: React.FC<props> = ({Task, removeTask, edit, setEdit, ready, setTasks}) => {

    const appContext = useContext(ApplicationContext);
    const projectContext = useContext(ProjectContext);
    const [updatedTask, updateTask] = useState(Task);

    const removeTaskAndCloseEditing = () => {
        setEdit(false);
        removeTask(Task.id);
    };

    function updateTitle(title: string) {
        updatedTask.title = title;
        updateTask(updatedTask);
    }

    function updateDescription(value: string) {
        updatedTask.description = value;
        updateTask(updatedTask);
    }

    function updateOwner(userId: string) {
        updatedTask.ownerId = userId;
        updateTask(updatedTask);
    }

    function updateTime(time: string) {
        updatedTask.time = time;
        updateTask(updatedTask);
    }

    function handleEnter(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key === 'Enter') {
            let updatedUserStoryTasks = TaskService.updateTask(updatedTask);
            setTasks(updatedUserStoryTasks);
            setEdit(false);
        }
    }

    const handleStopEdit = () => {
        let updatedUserStoryTasks = TaskService.updateTask(updatedTask);
        setTasks(updatedUserStoryTasks);
        setEdit(false);
    };

    const editTime = () => {
        if (appContext.getUserId() === updatedTask.ownerId) {
            return (
                <Input
                    type={"time"} defaultValue={Task.time ? Task.time : "set time"}
                    onChange={(e) => updateTime(e.target.value)}/>

            )
        } else return (
            updatedTask.time
        )
    };


    return (
        <TaskStyledComponent className={"TaskComponent"} ready={ready} onKeyDown={event => handleEnter(event)}>
            <div className={"task-id"}>{Task.id.substring(0, 5)}</div>
            <div className={"task-title"}><Input
                defaultValue={Task.title} onChange={(e) => updateTitle(e.target.value)}/></div>
            <div className={"task-description"}><Input.TextArea
                defaultValue={Task.description} onChange={(e) => updateDescription(e.target.value)}/></div>
            <div>{editTime()}</div>
            <div><UserDropdown userData={projectContext.participants}
                               onChange={updateOwner} base={projectContext.getUserName(Task.ownerId)}/></div>
            <AlertModal text={"Are you sure to delete this task ?"} buttonText={<DeleteOutlined/>}
                        OkFunction={() => removeTaskAndCloseEditing()}/>
            <div><SettingOutlined spin={edit} onClick={handleStopEdit} className={"userStory-edit"}/></div>
        </TaskStyledComponent>
    );
};

export default EditTask;