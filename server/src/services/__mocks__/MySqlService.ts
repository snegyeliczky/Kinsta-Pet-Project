import UserStory from "../../model/UserStory";

export const MySqlService ={

    getUserStoriesByProjectId: (projectId:number) =>{
        console.log("In mock MySqlService Mock");
        return[{id:1},{id:2}];
    },

    getTasksForUserStory: (userStory:UserStory) =>{
        return [{id:1,ready:0},{id:2,ready:1}];
    }
}