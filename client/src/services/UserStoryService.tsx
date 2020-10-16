import {UserStoryModel} from "../interfaces/UserStoryModel";

let UserStoryList:UserStoryModel[] = [];

let task1:UserStoryModel ={
    id:UserStoryList.length+1,
    projectId:1,
    userStory:"As a user I want to creat new Account",
    businessValue:100,
    estimation:2,
    ownerId:1,
    status:false,
    estimatedUsers:{1:2,2:3}

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
    estimatedUsers:{1:3,2:5}
};
UserStoryList.push(task2);

let task3:UserStoryModel ={
    id:UserStoryList.length+1,
    projectId:2,
    userStory:"As a user I want to transfer money to my friends",
    businessValue:500,
    estimation:8,
    ownerId:1,
    status:false,
    estimatedUsers:{5:2,2:3}
};
UserStoryList.push(task3);

let task4:UserStoryModel ={
    id:UserStoryList.length+1,
    projectId:1,
    userStory:"As a user I want to transfer money to my friends",
    businessValue:500,
    estimation:8,
    ownerId:1,
    status:false,
    estimatedUsers:{4:5,2:3}
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