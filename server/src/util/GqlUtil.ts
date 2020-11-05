import Task from "../model/Task";
import UserStory from "../model/UserStory";

export const GqlUtil = {
    checkUserStoryStatus: async (taskId: number) => {
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
    }
};