import React from 'react';
import {UserStoryModel} from "../interfaces/UserStoryModel";
import TaskComponent from "./TaskComponent";
import {CenterDiv, TaskHeaderTitleStyledComponent} from "../assets/styledComponents/styledComponents";
import NewTaskModal from "./Modals/NewTaskModal";
import {useQuery} from "@apollo/client";
import {getTaskForUserStory} from "../queries/taskQueries";
import {TaskModel} from "../interfaces/TaskModel";
import {newTaskSubscription, subscribeNewTask} from "../queries/subscriptions";

type props = {
    userStory: UserStoryModel,
}


const TaskTable: React.FC<props> = ({userStory}) => {

    const {loading, error, data, subscribeToMore} = useQuery(getTaskForUserStory, {
        variables: {
            id: userStory.id
        }
    });

    subscribeToMore(
        {
            document:newTaskSubscription,
            updateQuery:(prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                let taskList = prev.userStory.tasks;
                let b = taskList.some((task:TaskModel)=>{
                    return task.id === subscriptionData.data.newTask.id
                });
                if (!b){
                    return Object.assign({}, prev,{
                        userStory: {tasks:[...taskList,subscriptionData.data.newTask]}
                    });
                }
            }
        });

    subscribeToMore(
        {
            document:subscribeNewTask,
            updateQuery:(prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                console.log(prev);
                return {
                    userStory: {tasks:subscriptionData.data.tasksForUserStory}
                };
            }
        }
    )


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error! ${error.message}</div>;

    const loadTask = () => {
        if (data.userStory.tasks.length === 0) {
            return (
                <CenterDiv>
                    <h2 style={{color: "White"}}>No Tasks Yet !</h2>
                </CenterDiv>
            )
        }
        return (
            <>
                <TaskHeaderTitleStyledComponent className={"TaskComponent task-header"}>
                    <div className={"task-id"}>Task Id</div>
                    <div className={"task-title"}>Title</div>
                    <div className={"task-description"}>Description</div>
                    <div>Time</div>
                    <div>Owner</div>
                </TaskHeaderTitleStyledComponent>
                {
                    data.userStory.tasks.map((task: TaskModel) => {
                        return <TaskComponent key={task.id} Task={task}/>
                    })
                }
            </>
        )

    };

    return (
        <div>
            <NewTaskModal UserStoryId={userStory.id}/>
            {loadTask()}
        </div>
    );
};

export default TaskTable;