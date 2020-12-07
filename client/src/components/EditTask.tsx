import React, {Dispatch, SetStateAction, useContext, useState} from 'react';
import {TaskStyledComponent} from "../assets/styledComponents/styledComponents";
import {Input} from "antd";
import AlertModal from "./Modals/AlertModal";
import {TaskModel} from "../Types/TaskModel";
import {DeleteOutlined, SettingOutlined} from '@ant-design/icons';
import {ApplicationContext} from "../context/ApplicationContext";
import UserDropdown from './userDropdown';
import ProjectContext from "../context/ProjectContext";
import {useMutation} from "@apollo/client";
import {getTaskForUserStory, mutateTaskOwner, mutateTaskQuery,deleteTaskMutation} from "../queries/taskQueries";

type props = {
    Task: TaskModel,
    edit: boolean,
    setEdit: Dispatch<SetStateAction<boolean>>,
    ready: boolean,
}


const EditTask: React.FC<props> = ({Task, edit, setEdit, ready}) => {

    const appContext = useContext(ApplicationContext);
    const projectContext = useContext(ProjectContext);
    const [updatedTask, updateTask] = useState({...Task});
    const [mutateTask] = useMutation(mutateTaskQuery);
    const [changeOwner] = useMutation(mutateTaskOwner);
    const [deleteTask] = useMutation(deleteTaskMutation);


    const removeTaskAndCloseEditing = () => {
        deleteTask({
            variables:{
                taskId:Task.id
            },
            refetchQueries:[{query:getTaskForUserStory, variables:{id:Task.userStory.id}}]
        });
        setEdit(false);
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
        changeOwner({
            variables:{
                userId:userId,
                taskId:Task.id
            },
            refetchQueries:[{query:getTaskForUserStory, variables:{id:Task.userStory.id}}]
        })

    }

    function updateTime(time: string) {
        updatedTask.time = time;
        updateTask(updatedTask);
    }

    function handleKeyBoard(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key === 'Enter') {
            mutateTask({
                variables:{
                    taskId:updatedTask.id,
                    title:updatedTask.title,
                    description:updatedTask.description,
                    time:updatedTask.time
                }
            });
            setEdit(false);
        }if (event.key === 'Escape'){
            setEdit(false);
        }
    }

    const handleStopEdit = () => {
        mutateTask({
            variables:{
                taskId:updatedTask.id,
                title:updatedTask.title,
                description:updatedTask.description,
                time:updatedTask.time
            }
        });
        setEdit(false);
    };

    const editTime = () => {
        if (appContext.getUserId() === updatedTask.owner?.id.toString()) {
            return (
                <Input
                    type={"time"} defaultValue={Task.time ? Task.time : "set time"}
                    onChange={(e) => updateTime(e.target.value)}/>

            )
        } else return (
            updatedTask.time
        )
    };

    const showDelete = () =>{
        if (appContext.getUserId() === updatedTask.owner?.id.toString()) {
            return (
                <AlertModal text={"Are you sure to delete this task ?"} buttonText={<DeleteOutlined/>}
                            OkFunction={() => removeTaskAndCloseEditing()}/>

            )
        } else return (
            <div></div>
        )
    };


    return (
        <TaskStyledComponent className={"TaskComponent"} ready={ready} onKeyDown={event => handleKeyBoard(event)}>
            <div className={"task-id"}>{Task.id}</div>
            <div className={"task-title"}><Input
                defaultValue={Task.title} onChange={(e) => updateTitle(e.target.value)}/></div>
            <div className={"task-description"}><Input.TextArea
                defaultValue={Task.description} onChange={(e) => updateDescription(e.target.value)}/></div>
            <div>{editTime()}</div>
            <div><UserDropdown userData={projectContext.participants}
                               onChange={updateOwner} base={Task.owner?.firstName}/></div>
            {showDelete()}
            <div><SettingOutlined spin={edit} onClick={handleStopEdit} className={"userStory-edit"}/></div>
        </TaskStyledComponent>
    );
};

export default EditTask;