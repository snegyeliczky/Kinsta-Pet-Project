import React, {useState} from 'react';
import {UserStoryModel} from "../interfaces/UserStoryModel";
import TaskService from "../localServices/TaskService";
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

    const [tasks, setTasks] = useState(TaskService.getTasksByUserStory(userStory.id));
    const{loading,error,data} =useQuery(getTaskForUserStory,{variables:{id:userStory.id}});

    if (data)console.log(data.userStory.tasks,userStory.id);

    const removeTask = (taskId: string) => {
        let refreshedTasks = TaskService.removeTask(taskId);
        setTasks([...refreshedTasks]);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error! ${error.message}</div>;

    return (
        <div>
            <NewTaskModal UserStoryId={userStory.id} setTasks={setTasks}/>
            <TaskHeaderTitleStyledComponent className={"TaskComponent task-header"}>
                <div className={"task-id"}>Task Id</div>
                <div className={"task-title"}>Title</div>
                <div className={"task-description"}>Description</div>
                <div>Time</div>
                <div>Owner</div>
            </TaskHeaderTitleStyledComponent>
            {
                data.userStory.tasks.map((task:TaskModel) => {
                    return <TaskComponent key={task.id} Task={task} removeTask={removeTask} setTasks={setTasks}/>
                })
            }
        </div>
    );
};

export default TaskTable;