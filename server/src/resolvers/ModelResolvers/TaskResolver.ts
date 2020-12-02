import Task from "../../model/Task";

export const task=  {
    id: (parent: Task) => parent.id,
    title: (parent: Task) => parent.title,
    description: (parent: Task) => parent.description,
    ready: (parent: Task) => parent.ready,
    time: (parent: Task) => parent.time,
    userStory: async (parent: Task) => {
        let userStoryInList = await Task.relatedQuery("userStory").for(parent.id);
        return userStoryInList[0];
    },
    owner: async (parent: Task) => {
        let ownerInList = await Task.relatedQuery("owner").for(parent.id);
        return ownerInList[0];
    },
}