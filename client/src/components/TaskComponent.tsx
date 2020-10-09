import React from 'react';
import {Task} from "../interfaces/Task";
import {TaskStyleComponent} from "../assets/styledComponents/styledComponents";


interface Props {
    task:Task
}

const TaskComponent:React.FC<Props> = ({task}) => {
    return (
        <TaskStyleComponent key={task.id} className={"task-component"}>
            <div className={"task-id task-part"}>{task.id}</div>
            <div className={"task-userStory task-part"} >{task.userStory}</div>
            <div className={"task-businessValue task-part"}>{task.businessValue}</div>
            <div className={"task-ownerId task-part"}>{task.ownerId}</div>
            <div className={"task-estimation task-part"}>{task.estimation}h</div>
        </TaskStyleComponent>
    );
};

export default TaskComponent;