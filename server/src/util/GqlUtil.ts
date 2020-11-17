import User from "../model/User";
import {MySqlService} from "../services/MySqlService";
import ParticipateInvite from "../model/ParticipateInvite";

export const GqlUtil = {

    checkUserStoryStatus: async (taskId: number) => {
        let userStoryInList = await MySqlService.getUserStoryForTask(taskId);
        let userStory = userStoryInList[0];
        let tasks = await MySqlService.getTasksForUserStory(userStory);
        if (tasks.length > 0) {
            let ready = tasks.reduce((re, task) => {
                if (!task.ready) {
                    re.status = false;
                }
                return re;
            }, {status: true});
            return {userStoryId: userStory.id, status: ready.status};
        } else return {userStoryId: userStory.id, status: false};
    },

    checkUserHaveInvitationToProject: async (receiverInvites: ParticipateInvite[], projectId: number) => {
        for (let invite of receiverInvites) {
            let project = await MySqlService.getProjectForInvite(invite.id);
            console.log(project)
            if (project.id === projectId) return true;
        }
        return false;
    },

    unFinishedTasksForUser: async (userId: number) => {
        let userTasks = await MySqlService.getTasksForUser(userId)
        return userTasks.filter(task => {
            if (!task.ready) {
                return task;
            }
        })
    },

    getProjectInvitationsForUser: async (userId: number) => {
        return User.relatedQuery('receivedInvites').for(userId)
    },

    geTasksDistributionForProject: async (projectId: number) => {
        let userStories = await MySqlService.getUserStoriesByProjectId(projectId);
        let finishedTasks = 0;
        let allTask = 0;
        for (let us of userStories) {
            let tasks = await MySqlService.getTasksForUserStory(us);
            let filtered = tasks.filter(t => {
                return !!t.ready === true;
            });
            finishedTasks += filtered.length;
            allTask += tasks.length;
        }
        return {finishedTasks: finishedTasks, allTasks: allTask}
    },

};