import User from "../model/User";
import UserStory from "../model/UserStory";
import Task from "../model/Task";
import Project from "../model/Project";
import Company from "../model/Company";
import ParticipateInvite from "../model/ParticipateInvite";

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

    updateCompany: async (companyId:number, companyName:string) =>{
        await Company.query().findById(companyId).patch({name:companyName});
        return Company.query().findById(companyId);
    },
    updateProject: async (projectId:number, projectName:string) =>{
        await Project.query().findById(projectId).patch({
            name:projectName
        });
       return Project.query().findById(projectId);
    },

    updateUserStory: async (ownerId: number, userStory: string,
                            userStoryId: number) => {
        await UserStory.relatedQuery("owner").for(userStoryId).relate(ownerId);
        await UserStory.query().findById(userStoryId).patch({
            userStory: userStory,
        });
        return UserStory.query().findById(userStoryId);
    },

    updateTask: async (taskId: number, title: string,
                       description: string, time: string) =>{
        await Task.query().findById(taskId).patch({
            title:title,
            description:description,
            time:time
        });
        return Task.query().findById(taskId);
    },

    sendProjectParticipationInvite:async (senderId:number,receiverId:number,projectId:number) =>{
        let projectParticipants = await Project.relatedQuery('participants').for(projectId);
        if (projectParticipants.some((user:User)=>{return user.id===receiverId})){
            return "user all ready have Invitation"
        }
        let invitation = await User.relatedQuery('sandedInvites').for(senderId).insert({});
        await invitation.$relatedQuery('project').relate(projectId);
        await invitation.$relatedQuery('receiver').relate(receiverId);
        return invitation
    },

    addUserToProjectAsParticipant: async (userId:number, projectId:number) => {
        return Project.relatedQuery('participants').for(projectId).relate(userId);
    },

    acceptParticipationInvitation : async (invitationId:number) =>{
        let invite = await ParticipateInvite.query().findById(invitationId);
        let project = await invite.$relatedQuery('project');
        let receiver = await invite.$relatedQuery('receiver');
        let participants = await project.$relatedQuery('participants');
        if (!participants.some((user:User) =>{ return user.id===receiver.id})) {
            await project.$relatedQuery('participants').relate(receiver.id);
            await ParticipateInvite.query().deleteById(invitationId);
        }else {
            console.log("user is all ready participate in project")
        }
        return project.$relatedQuery('participants');
    }
};



