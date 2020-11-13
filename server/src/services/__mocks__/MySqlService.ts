import UserStory from "../../model/UserStory";
import User from "../../model/User";

export const MySqlService ={

    getUserStoriesByProjectId: (projectId:number) =>{
        return[{id:1},{id:2}];
    },

    getTasksForUserStory: (userStory:UserStory) =>{
        return [{id:1,ready:0},{id:2,ready:1}];
    },
    getTasksForUser: (userId: number) => {
        return [{id:1,ready:0, title:"not ready"},{id:2,ready:1, title:"ready" }]
    },
}