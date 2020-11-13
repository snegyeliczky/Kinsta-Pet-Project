import Project from "../model/Project";
import UserStory from "../model/UserStory";
import User from "../model/User";

export const MySqlService = {
    getUserStoriesByProjectId: async (projectId: number) => {
        return Project.relatedQuery('userStories').for(projectId);
    },

    getTasksForUserStory: async (userStory: UserStory) => {
        return userStory.$relatedQuery('tasks').for(userStory.id)
    },
    getTasksForUser: async (userId: number) => {
        return User.relatedQuery('tasks').for(userId);
    },

}