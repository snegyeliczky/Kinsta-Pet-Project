import React, {Dispatch, SetStateAction, useState} from 'react';
import {TaskModel} from "../interfaces/TaskModel";
import {TaskStyledComponent} from "../assets/styledComponents/styledComponents";
import { SettingOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import TaskService from "../services/TaskService";
import EditTask from "./EditTask";

type Props ={
    Task:TaskModel,
    removeTask:Function,
    setTasks:Dispatch<SetStateAction<TaskModel[]>>
    getUser:Function
}

const TaskComponent:React.FC<Props> = ({Task,removeTask,setTasks, getUser}) => {

    const[edit, setEdit] = useState(false);


    const handleCheck =()=>{
        let refreshedTasks = TaskService.setTaskReady(Task.id);
        setTasks(refreshedTasks);

    };

    function showOwner() {
        let user = getUser(Task.ownerId);
        return user?user.firstName:"no owner";
    }

    return (
        <>
        {
            edit?<EditTask Task={Task} removeTask={removeTask} edit={edit}
                           setEdit={setEdit} ready={Task.ready} setTasks={setTasks}/>
            :<TaskStyledComponent className={"TaskComponent"} ready={Task.ready}>
                    <div className={"task-id"}>{Task.id.substring(0,5)}</div>
                    <div className={"task-title"}>{Task.title}</div>
                    <div className={"task-description"}>{Task.description}</div>
                    <div>{Task.time}</div>
                    <div>{showOwner()}</div>
                    <div><Checkbox onChange={e => handleCheck()} checked={Task.ready}/></div>
                    <div><SettingOutlined spin={edit} onClick={()=>setEdit(true)} className={"userStory-edit"}/></div>
                </TaskStyledComponent>
        }
        </>
    );
};

export default TaskComponent;