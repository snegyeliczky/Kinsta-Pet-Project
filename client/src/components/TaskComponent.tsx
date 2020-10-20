import React, {Dispatch, SetStateAction, useContext, useState} from 'react';
import {TaskModel} from "../interfaces/TaskModel";
import {TaskStyledComponent} from "../assets/styledComponents/styledComponents";
import { SettingOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import TaskService from "../services/TaskService";
import EditTask from "./EditTask";
import ProjectContext from "../context/ProjectContext";
import {ApplicationContext} from "../context/ApplicationContext";

type Props ={
    Task:TaskModel,
    removeTask:Function,
    setTasks:Dispatch<SetStateAction<TaskModel[]>>
}

const TaskComponent:React.FC<Props> = ({Task,removeTask,setTasks}) => {

    const projectContext= useContext(ProjectContext);
    const appContext = useContext(ApplicationContext);
    const[edit, setEdit] = useState(false);


    const handleCheck =()=>{
        let refreshedTasks = TaskService.setTaskReady(Task.id);
        setTasks(refreshedTasks);

    };

    function showCheckBox(ownerId:string|null|undefined) {
       if(appContext.getUserId()===ownerId)
            return(<Checkbox onChange={e => handleCheck()} checked={Task.ready}/>);
       return '';
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
                    <div>{projectContext.getUserName(Task.ownerId)}</div>
                    <div>{showCheckBox(Task.ownerId)}</div>
                    <div><SettingOutlined spin={edit} onClick={()=>setEdit(true)} className={"userStory-edit"}/></div>
                </TaskStyledComponent>
        }
        </>
    );
};

export default TaskComponent;