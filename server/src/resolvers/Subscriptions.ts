export const subscriptions = {
    tasksForUserStory: {
        subscribe: (parent: any, args: any, Context: { pubSub: any }) => {
            return Context.pubSub.asyncIterator("NEW_TASK_FOR_USER_STORY")
        }
    }
};