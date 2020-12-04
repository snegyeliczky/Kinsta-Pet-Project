import UserStory from "../../model/UserStory";

export const userStory ={
    id: (parent: UserStory) => parent.id,
    userStory: (parent: UserStory) => parent.userStory,
    project: async (parent: UserStory) => {
        let projectList = await UserStory.relatedQuery("project").for(parent.id);
        return projectList[0];
    },
    status: (parent: UserStory) => parent.status,
    businessValue: (parent: UserStory) => parent.businessValue,
    owner: async (parent: UserStory) => {
        let ownerList = await UserStory.relatedQuery("owner").for(parent.id);
        return ownerList[0];
    },
    estimatedUsers: async (parent: UserStory) => {
        return UserStory.relatedQuery("estimatedUsers").for(parent.id);
    },
    tasks: async (parent: UserStory) => {
        return UserStory.relatedQuery("tasks").for(parent.id);
    },
}