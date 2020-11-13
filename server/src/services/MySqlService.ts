import Project from "../model/Project";
import UserStory from "../model/UserStory";

export const MySqlService ={
    getUserStoriesByProjectId: async (projectId:number) =>{
        return Project.relatedQuery('userStories').for(projectId);
    },

    getTasksForUserStory: async (userStory:UserStory) =>{
        return userStory.$relatedQuery('tasks').for(userStory.id)
    }
}