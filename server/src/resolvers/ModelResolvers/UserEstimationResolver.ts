import UserEstimation from "../../model/UserEstimation";

export const userEstimation ={
    id: (parent: UserEstimation) => parent.id,
    estimation: (parent: UserEstimation) => parent.estimation,
    owner: async (parent: UserEstimation) => {
        let ownerList = await UserEstimation.relatedQuery('owner').for(parent.id);
        return ownerList[0]
    },
    userStory: async (parent: UserEstimation) => {
        let storyList = await UserEstimation.relatedQuery('userStory').for(parent.id);
        return storyList[0];
    },
}