import React, {useContext, useState} from 'react';
import {TaskModel} from "../interfaces/TaskModel";
import {TaskStyledComponent} from "../assets/styledComponents/styledComponents";
import { SettingOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import EditTask from "./EditTask";
import {ApplicationContext} from "../context/ApplicationContext";
import {UserModel} from "../interfaces/UserModel";
import {useMutation} from "@apollo/client";
import { updateTaskStatus} from "../queries/taskQueries";
import {useParams} from "react-router";
import {getUserStories} from "../queries/projectQueries";

type Props ={
    Task:TaskModel
}

const TaskComponent:React.FC<Props> = ({Task}) => {

    const appContext = useContext(ApplicationContext);
    const[edit, setEdit] = useState(false);
    const {id} = useParams();

    const [mutateTaskStatus] = useMutation(updateTaskStatus);


    const handleCheck = async ()=>{
        await mutateTaskStatus({
            variables:{
                taskId:Task.id,
                taskStatus:!Task.ready
            },
            refetchQueries:[
                {query:getUserStories, variables:{id}}
                ]
        });
    };

    function showCheckBox(owner:UserModel | null | undefined) {
       if(owner && appContext.getUserId()===owner.id.toString())
            return(<Checkbox onChange={e => handleCheck()} checked={Task.ready}/>);
       return '';
    }


    return (
        <>
        {
            edit?<EditTask Task={Task} edit={edit}
                           setEdit={setEdit} ready={Task.ready}/>
            :<TaskStyledComponent className={"TaskComponent"} ready={Task.ready}>
                    <div className={"task-id"}>{Task.id}</div>
                    <div className={"task-title"}>{Task.title}</div>
                    <div className={"task-description"}>{Task.description}</div>
                    <div>{Task.time}</div>
                    <div>{Task.owner?.firstName}</div>
                    <div>{showCheckBox(Task.owner)}</div>
                    <div><SettingOutlined spin={edit} onClick={()=>setEdit(true)} className={"userStory-edit"}/></div>
                </TaskStyledComponent>
        }
        </>
    );
};

export default TaskComponent;