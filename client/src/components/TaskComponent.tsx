import React from 'react';
import {TaskModel} from "../interfaces/TaskModel";
import {TaskStyledComponent} from "../assets/styledComponents/styledComponents";

type Props ={
    Task:TaskModel
}

const TaskComponent:React.FC<Props> = ({Task}) => {
    return (
        <TaskStyledComponent className={"TaskComponent"}>
            <div className={"task-id"}>{Task.id.substring(0,5)}</div>
            <div className={"task-title"}>{Task.title}</div>
            <div className={"task-description"}>{Task.description}</div>
            <div>{Task.ownerId}</div>
        </TaskStyledComponent>
    );
};

export default TaskComponent;