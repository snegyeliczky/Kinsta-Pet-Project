import React from 'react';
import {Task} from "../interfaces/Task";


interface Props {
    task:Task
}

const TaskComponent:React.FC<Props> = ({task}) => {
    return (
        <div key={task.id} className={"task-component"}>
            <div className={"task-id task-part"}>{task.id}</div>
            <div className={"task-userStory task-part"} >{task.userStory}</div>
            <div className={"task-businessValue task-part"}>{task.businessValue}</div>
            <div className={"task-ownerId task-part"}>{task.ownerId}</div>
            <div className={"task-estimation task-part"}>{task.estimation}h</div>
        </div>
    );
};

export default TaskComponent;