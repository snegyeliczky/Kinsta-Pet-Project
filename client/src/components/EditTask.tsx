import React, {Dispatch, SetStateAction} from 'react';
import {TaskStyledComponent} from "../assets/styledComponents/styledComponents";
import { Input} from "antd";
import AlertModal from "./Modals/AlertModal";
import {TaskModel} from "../interfaces/TaskModel";
import { DeleteOutlined, SettingOutlined } from '@ant-design/icons';

type props ={
    Task:TaskModel,
    removeTask:Function,
    edit:boolean,
    setEdit: Dispatch<SetStateAction<boolean>>,
    ready:boolean,

}



const EditTask:React.FC<props> = ({Task,removeTask,edit,setEdit, ready}) => {

    const handleStopEdit = ()=>{
        setEdit(false)
    };

    const removeTaskAndCloseEditing = () =>{
        setEdit(false);
        removeTask(Task.id);
    };


    return (
        <TaskStyledComponent className={"TaskComponent"} ready={ready}>
            <div className={"task-id"}>{Task.id.substring(0,5)}</div>
            <div className={"task-title"}><Input defaultValue={Task.title}/></div>
            <div className={"task-description"}><Input.TextArea defaultValue={Task.description}/></div>
            <div><Input type={"number"} defaultValue={Task.ownerId?Task.ownerId:""}/></div>
            <AlertModal text={"Are you sure to delete this task ?"} buttonText={<DeleteOutlined/>} OkFunction={()=>removeTaskAndCloseEditing()}/>
            <div><SettingOutlined spin={edit} onClick={handleStopEdit} className={"userStory-edit"}/></div>
        </TaskStyledComponent>
    );
};

export default EditTask;