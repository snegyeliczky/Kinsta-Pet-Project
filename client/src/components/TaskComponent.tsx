import React, {useState} from 'react';
import {TaskModel} from "../interfaces/TaskModel";
import {TaskStyledComponent} from "../assets/styledComponents/styledComponents";
import AlertModal from "./Modals/AlertModal";
import { DeleteOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import TaskService from "../services/TaskService";

type Props ={
    Task:TaskModel,
    removeTask:Function,
}

const TaskComponent:React.FC<Props> = ({Task,removeTask}) => {

    const[ready,setReady] = useState(Task.ready);

    const handleCheck =()=>{
        let isReady = TaskService.setTaskReady(Task.id);
        setReady(isReady);

    };

    return (
        <TaskStyledComponent className={"TaskComponent"} ready={ready}>
            <div className={"task-id"}>{Task.id.substring(0,5)}</div>
            <div className={"task-title"}>{Task.title}</div>
            <div className={"task-description"}>{Task.description}</div>
            <div>{Task.ownerId}</div>
            <div><Checkbox onChange={e => handleCheck()} checked={ready}/></div>
            <AlertModal text={"Are you sure to delete this task ?"} buttonText={<DeleteOutlined/>} OkFunction={()=>removeTask(Task.id)}/>
        </TaskStyledComponent>
    );
};

export default TaskComponent;