import React from 'react';
import {UserStoryModel} from "../interfaces/UserStoryModel";
import TaskComponent from "./TaskComponent";
import {TaskHeaderTitleStyledComponent} from "../assets/styledComponents/styledComponents";
import NewTaskModal from "./Modals/NewTaskModal";
import {useQuery} from "@apollo/client";
import {getTaskForUserStory} from "../queries/taskQueries";
import {TaskModel} from "../interfaces/TaskModel";

type props = {
    userStory: UserStoryModel,
}


const TaskTable: React.FC<props> = ({userStory}) => {

    const {loading, error, data} = useQuery(getTaskForUserStory, {variables: {id: userStory.id}});


    const removeTask = (taskId: string) => {

    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error! ${error.message}</div>;

    return (
        <div>
            <NewTaskModal UserStoryId={userStory.id}/>
            <TaskHeaderTitleStyledComponent className={"TaskComponent task-header"}>
                <div className={"task-id"}>Task Id</div>
                <div className={"task-title"}>Title</div>
                <div className={"task-description"}>Description</div>
                <div>Time</div>
                <div>Owner</div>
            </TaskHeaderTitleStyledComponent>
            {
                data.userStory.tasks.map((task: TaskModel) => {
                    return <TaskComponent key={task.id} Task={task} removeTask={removeTask}/>
                })
            }
        </div>
    );
};

export default TaskTable;