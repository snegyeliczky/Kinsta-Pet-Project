import User from "../model/User";

export const GqlService = {

    estimator: async (userId: number, userStoryId: number, estimation: number) => {
        let userStories = await User.relatedQuery('userStoryEstimations')
            .for(userId)
            .where('user_storyId', userStoryId);

        if (userStories.length > 0) {
            console.log(`user ${userId} updated user story ${userStoryId} estimation to: ${estimation}`);
            await User.relatedQuery('userStoryEstimations')
                .for(userId)
                .patch({estimation: estimation}).where('user_storyId', userStoryId);
            return 1
        } else {
            console.log(`user ${userId} estimated user story ${userStoryId} to: ${estimation}`);
            let userEstimation = await User.relatedQuery('userStoryEstimations')
                .for(userId)
                .insert({estimation: estimation});
            await userEstimation.$relatedQuery('userStory').relate(userStoryId);
            return 0
        }
    },

}



