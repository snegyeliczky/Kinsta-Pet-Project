import UserStory from "../../model/UserStory";
import User from "../../model/User";

export const MySqlService = {

    getUserStoriesByProjectId: (projectId: number) => {
        return [{id: 1}, {id: 2}];
    },

    getTasksForUserStory: (userStory: UserStory) => {
        if (userStory.id===1){
            return [{id: 1, ready: 1}, {id: 2, ready: 1}];
        }if (userStory.id===2){
            return [{id: 3, ready: 0}, {id: 4, ready: 1}];
        }else {
            return [{id: 5, ready: 0}, {id: 6, ready: 0}];
        }

    },
    getTasksForUser: (userId: number) => {
        return [{id: 1, ready: 0, title: "not ready"}, {id: 2, ready: 1, title: "ready"}]
    },
    getUserStoryForTask: (taskId: number) => {
        if (taskId===1 || taskId===2){
            return [
                {
                    id: 1,
                    userId: 1,
                    projectId: 1,
                    userStory: 'frontend colors shames',
                    status: 0,
                    businessValue: null
                }
            ]
        }if (taskId===3||taskId===4){
            return [
                {
                    id: 2,
                    userId: 1,
                    projectId: 1,
                    userStory: 'frontend colors shames',
                    status: 0,
                    businessValue: null
                }
            ]
        }else {
            return [
                {
                    id: 3,
                    userId: 1,
                    projectId: 1,
                    userStory: 'frontend colors shames',
                    status: 0,
                    businessValue: null
                }
            ]
        }

    }

}