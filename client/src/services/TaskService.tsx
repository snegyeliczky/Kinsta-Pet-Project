import {v4 as uuid} from "uuid";
import {TaskModel} from "../interfaces/TaskModel";

let TaskList:TaskModel[] = [];

let Task1:TaskModel={
    id:uuid(),
    userStoryId:1,
    title:"registration page",
    description:"creat a page where the user can create account",
    priority:1,
    ownerId:1
};
TaskList.push(Task1);

let Task2:TaskModel={
    id:uuid(),
    userStoryId:1,
    title:"Login page",
    description:"creat a page where the user can Login",
    priority:2,
    ownerId:1
};
TaskList.push(Task2);

let Task3:TaskModel={
    id:uuid(),
    userStoryId:1,
    title:"Create backend for Accounts",
    description:"creat DB where the data stored ",
    priority:3,
};
TaskList.push(Task3);

let Task4:TaskModel={
    id:uuid(),
    userStoryId:1,
    title:"Create service to get data from db",
    description:"",
    priority:1,
    ownerId:1
};
TaskList.push(Task4);

let Task5:TaskModel={
    id:uuid(),
    userStoryId:2,
    title:"Create service to get Account balance",
    description:"Create service to get Account balance from Db",
    priority:4,
    ownerId:1
};
TaskList.push(Task5);

export default {

    getTasksByUserStory: (UserStoryId:number):TaskModel[] =>{
        return TaskList.filter(task =>{
            return task.userStoryId === UserStoryId;
        })
    },

    saveNewTask:(newTask:TaskModel):TaskModel[] =>{
        newTask.id=uuid();
        TaskList.push(newTask);
        return TaskList.filter(task=>{
            return task.userStoryId===newTask.userStoryId;
        })
    },

    removeTask:(taskId:string):TaskModel[] =>{
        let UserStoryId:number;
        TaskList = TaskList.filter(task=>{
            if (task.id===taskId){
                UserStoryId=task.userStoryId;
            }
            return task.id!==taskId
        });
        return TaskList.filter(task=>{
            return task.userStoryId===UserStoryId
        });
    }
}