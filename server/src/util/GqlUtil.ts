import Task from "../model/Task";
import UserStory from "../model/UserStory";
import User from "../model/User";

export const GqlUtil = {

    checkUserStoryStatus: async (taskId: number): Promise<boolean> => {
        let userStoryInList = await Task.relatedQuery('userStory').for(taskId);
        let userStory = userStoryInList[0];
        let tasks = await userStory.$relatedQuery('tasks');
        if (tasks.length > 0) {
            let ready = tasks.reduce((re, task) => {
                if (!task.ready) {
                    re.status = false;
                }
                return re;
            }, {status: true});
            UserStory.query().findById(userStory.id).patch({status: ready.status});
            return ready.status;
        } else UserStory.query().findById(userStory.id).patch({status: false});
        return false;
    },

    unFinishedTasksForUser: async(userId:number)=>{
        let userTasks = await User.relatedQuery('tasks').for(userId);
        return userTasks.map(task =>{
            if (!task.ready){
                return task;
            }
        })
    },

    getProjectInvitationsForUser: async (userId:number) =>{
        return  User.relatedQuery('receivedInvites').for(userId)
    },
};