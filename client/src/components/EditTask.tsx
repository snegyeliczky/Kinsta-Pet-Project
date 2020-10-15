import React, {Dispatch, SetStateAction, useState} from 'react';
import {TaskStyledComponent} from "../assets/styledComponents/styledComponents";
import {Input} from "antd";
import AlertModal from "./Modals/AlertModal";
import {TaskModel} from "../interfaces/TaskModel";
import {DeleteOutlined, SettingOutlined} from '@ant-design/icons';
import TaskService from "../services/TaskService";

type props = {
    Task: TaskModel,
    removeTask: Function,
    edit: boolean,
    setEdit: Dispatch<SetStateAction<boolean>>,
    ready: boolean,
    setTasks: Dispatch<SetStateAction<TaskModel[]>>,

}


const EditTask: React.FC<props> = ({Task, removeTask, edit, setEdit, ready, setTasks}) => {

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

    function updateOwner(valueAsNumber: number) {
        updatedTask.ownerId = valueAsNumber;
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


    return (
        <TaskStyledComponent className={"TaskComponent"} ready={ready} onKeyDown={event => handleEnter(event)}>
            <div className={"task-id"}>{Task.id.substring(0, 5)}</div>
            <div className={"task-title"}><Input
                defaultValue={Task.title} onChange={(e) => updateTitle(e.target.value)}/></div>
            <div className={"task-description"}><Input.TextArea
                defaultValue={Task.description} onChange={(e) => updateDescription(e.target.value)}/></div>
            <div><Input
                type={"number"} defaultValue={Task.ownerId ? Task.ownerId : ""}
                onChange={(e) => updateOwner(e.target.valueAsNumber)}/></div>
            <AlertModal text={"Are you sure to delete this task ?"} buttonText={<DeleteOutlined/>}
                        OkFunction={() => removeTaskAndCloseEditing()}/>
            <div><SettingOutlined spin={edit} onClick={handleStopEdit} className={"userStory-edit"}/></div>
        </TaskStyledComponent>
    );
};

export default EditTask;