import {Task} from "../interfaces/Task";

let taskList:Task[] = [];

let task1:Task ={
    id:taskList.length+1,
    projectId:1,
    userStory:"As a user I want to creat new Account",
    businessValue:100,
    estimation:2,
    ownerId:1,
    status:false
};
taskList.push(task1);

let task2:Task ={
    id:taskList.length+1,
    projectId:1,
    userStory:"As a user I want to see my balance on the page",
    businessValue:200,
    estimation:12,
    ownerId:null,
    status:false
};
taskList.push(task2);

let task3:Task ={
    id:taskList.length+1,
    projectId:1,
    userStory:"As a user I want to transfer money to my friends",
    businessValue:500,
    estimation:8,
    ownerId:1,
    status:false
};
taskList.push(task3);

let task4:Task ={
    id:taskList.length+1,
    projectId:2,
    userStory:"As a user I want to transfer money to my friends",
    businessValue:500,
    estimation:8,
    ownerId:1,
    status:false
};
taskList.push(task4);

export default {

}