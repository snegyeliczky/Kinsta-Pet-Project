import {UserStoryModel} from "../interfaces/UserStoryModel";

let UserStoryList:UserStoryModel[] = [];

let task1:UserStoryModel ={
    id:UserStoryList.length+1,
    projectId:1,
    userStory:"As a user I want to creat new Account",
    businessValue:100,
    estimation:2,
    ownerId:"d448b8bb-3df5-4683-9507-3648e6d98b67",
    status:false,
    estimatedUsers:{"d448b8bb-3df5-4683-9507-3648e6d98b67":2,"6f0050a8-f799-49ad-b71d-9372744ce063":3}

};
UserStoryList.push(task1);

let task2:UserStoryModel ={
    id:UserStoryList.length+1,
    projectId:1,
    userStory:"As a user I want to see my balance on the page",
    businessValue:200,
    estimation:12,
    ownerId:null,
    status:false,
    estimatedUsers:{"d448b8bb-3df5-4683-9507-3648e6d98b67":3,"6f0050a8-f799-49ad-b71d-9372744ce063":5}
};
UserStoryList.push(task2);

let task3:UserStoryModel ={
    id:UserStoryList.length+1,
    projectId:2,
    userStory:"As a user I want to transfer money to my friends",
    businessValue:500,
    estimation:8,
    ownerId:"6f0050a8-f799-49ad-b71d-9372744ce063",
    status:false,
    estimatedUsers:{"b581a269-5e24-4079-82a6-16a5854a9bdc":2,"6f0050a8-f799-49ad-b71d-9372744ce063":3}
};
UserStoryList.push(task3);

let task4:UserStoryModel ={
    id:UserStoryList.length+1,
    projectId:1,
    userStory:"As a user I want to transfer money to my friends",
    businessValue:500,
    estimation:8,
    ownerId:"6f0050a8-f799-49ad-b71d-9372744ce063",
    status:false,
    estimatedUsers:{"b581a269-5e24-4079-82a6-16a5854a9bdc":5,"6f0050a8-f799-49ad-b71d-9372744ce063":3}
};
UserStoryList.push(task4);

export default {


    getUserStoresByProjectId:(projectID:number):UserStoryModel[]=>{
       return UserStoryList.filter(task =>{
            return task.projectId===projectID;
        })
    },

    saveNewUserStory:(newTask:UserStoryModel):UserStoryModel[] =>{
        newTask.id=UserStoryList.length+1;
        UserStoryList.push(newTask);
        return UserStoryList.filter(task =>{
            return task.projectId===newTask.projectId;
        })
    },

    updateUserStory:(EditedUserStory:UserStoryModel) =>{
        UserStoryList.map(userStory=>{
            if (userStory.id===EditedUserStory.id){
                userStory=EditedUserStory
            }
            return userStory;
        });
    },

    removeUserStory:(userStoryId:number)=>{
        let projectId:number;
        UserStoryList = UserStoryList.filter(story =>{
            if (story.id===userStoryId){
                projectId=story.projectId
            }
            return story.id!==userStoryId;
        });
        return UserStoryList.filter(story =>{
            return story.projectId === projectId
        });
    },
}