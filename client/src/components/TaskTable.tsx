import React from 'react';
import {UserStoryModel} from "../Types/UserStoryModel";
import TaskComponent from "./TaskComponent";
import {CenterDiv, TaskHeaderTitleStyledComponent} from "../assets/styledComponents/styledComponents";
import NewTaskModal from "./Modals/NewTaskModal";
import {useQuery} from "@apollo/client";
import {getTaskForUserStory} from "../queries/taskQueries";
import {TaskModel} from "../Types/TaskModel";
import {newTaskSubscription, removeTask, subscribeUserStoryTasks} from "../queries/subscriptions";

type props = {
    userStory: UserStoryModel,
}


const TaskTable: React.FC<props> = ({userStory}) => {

    const {loading, error, data, subscribeToMore} = useQuery(getTaskForUserStory, {
        variables: {
            id: userStory.id
        },
        fetchPolicy: "network-only",
        onCompleted: () => {
            subscribeToNewTask();
            subscribeToStatusChange();
            subscriberToRemove()
        }
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error! ${error.message}</div>;

    const subscribeToNewTask = () => subscribeToMore(
        {
            document: newTaskSubscription,
            variables: {userStoryId: userStory.id},
            updateQuery: (prev, {subscriptionData}) => {
                if (!subscriptionData.data) return prev;
                let taskList = prev.userStory.tasks ? prev.userStory.tasks : [];
                let some = taskList.some((task: TaskModel) => {
                    return task.id === subscriptionData.data.newTask.id
                });
                if (!some) {
                    return Object.assign({}, prev, {
                        userStory: {tasks: [...taskList, subscriptionData.data.newTask]}
                    });
                }
            }
        });

    const subscribeToStatusChange = () => subscribeToMore(
        {
            document: subscribeUserStoryTasks,
            variables: {userStoryId: userStory.id},
            updateQuery: (prev, {subscriptionData}) => {
                if (!subscriptionData.data) return prev;
                return {
                    userStory: {tasks: subscriptionData.data.tasksForUserStory}
                };
            }
        }
    );

    const subscriberToRemove = () => subscribeToMore(
        {
            document: removeTask,
            variables: {userStoryId: userStory.id},
            updateQuery: (prev, {subscriptionData}) => {
                if (!subscriptionData.data) return prev;
                let newList = [...prev.userStory.tasks];
                let rmTsId = subscriptionData.data.removeTask;
                newList = newList.filter((us: UserStoryModel) => {
                    if (us.id !== rmTsId) return us;
                });
                return {
                    userStory: {
                        tasks: newList
                    }
                }
            }
        }
    );

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