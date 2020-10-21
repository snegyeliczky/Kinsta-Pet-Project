import {v4 as uuid} from "uuid";
import {TaskModel} from "../interfaces/TaskModel";

let TaskList:TaskModel[] = [];

let Task1:TaskModel={
    id:"292ae9d4-ae31-4fa9-ac73-78185c017bd6",
    userStoryId:1,
    title:"registration page",
    description:"creat a page where the user can create account",
    time:"01:10",
    ownerId:"d448b8bb-3df5-4683-9507-3648e6d98b67",
    ready:true,
};
TaskList.push(Task1);

let Task2:TaskModel={
    id:"d8c6f859-b639-4119-a969-53ca0144811c",
    userStoryId:1,
    title:"Login page",
    description:"creat a page where the user can Login",
    ownerId:"6f0050a8-f799-49ad-b71d-9372744ce063",
    ready:false,
};
TaskList.push(Task2);

let Task3:TaskModel={
    id:"e8ceda22-2314-4992-b3d2-493e67c74851",
    userStoryId:1,
    title:"Create backend for Accounts",
    description:"creat DB where the data stored ",
    time:"03:30",
    ready:false,
};
TaskList.push(Task3);

let Task4:TaskModel={
    id:"a3193d5f-6af4-4213-970e-7ed0637d5d27",
    userStoryId:1,
    title:"Create service to get data from db",
    description:"",
    time:"01:50",
    ownerId:"d448b8bb-3df5-4683-9507-3648e6d98b67",
    ready:false,
};
TaskList.push(Task4);

let Task5:TaskModel={
    id:"a3fc43e8-e0d5-4d78-9db0-b367c22b33b8",
    userStoryId:2,
    title:"Create service to get Account balance",
    description:"Create service to get Account balance from Db",
    time:"04:00",
    ownerId:"d448b8bb-3df5-4683-9507-3648e6d98b67",
    ready:false,
};
TaskList.push(Task5);

export default {

    setTaskReady:(TaskId:string):TaskModel[] =>{
        let userStoryId!:number;
        TaskList.map(task =>{
            if (task.id===TaskId){
                task.ready =!task.ready;
                userStoryId=task.userStoryId;
            }
            return task
        });
        return TaskList.filter(task=>{
            return task.userStoryId===userStoryId;
        });
    },

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

    updateTask:(updatedTask:TaskModel):TaskModel[] =>{
        TaskList.map(task =>{
            if (task.id===updatedTask.id){
                task.description=updatedTask.description;
                task.title=updatedTask.title;
                task.time=updatedTask.time;
                task.ownerId=updatedTask.ownerId;
                task.ready=updatedTask.ready;
            }
            return task;
        });

        return TaskList.filter(task=>{
            return task.userStoryId===updatedTask.userStoryId
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