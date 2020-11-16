import Project from "../model/Project";
import UserStory from "../model/UserStory";
import User from "../model/User";
import Task from "../model/Task";
import ParticipateInvite from "../model/ParticipateInvite";

export const MySqlService = {
    getUserStoriesByProjectId: async (projectId: number) => {
        return Project.relatedQuery('userStories').for(projectId);
    },

    getTasksForUserStory: async (userStory: UserStory) => {
        return userStory.$relatedQuery('tasks').for(userStory.id)
    },

    getTasksForUser: async (userId: number) => {
        return User.relatedQuery('tasks').for(userId);
    },

    getUserStoryForTask: (taskId: number) => {
        return Task.relatedQuery('userStory').for(taskId);
    },

    updateUserStory: async (userStoryId: number, update: object) => {
        await UserStory.query().findById(userStoryId).patch(update);
        return UserStory.query().findById(userStoryId);
    },

    getProjectParticipants: async (projectId: number) => {
        return Project.relatedQuery('participants').for(projectId);
    },

    getUserInvitationsForParticipation: async (userId: number) => {
        return User.relatedQuery('receivedInvites').for(userId)
    },

    getProjectForInvite: async (inviteId:number)=>{
        let projectInList = await ParticipateInvite.relatedQuery('project').for(inviteId);
        return projectInList[0]
    },

    sendInvite: async (senderId:number,projectId:number,receiverId:number) =>{
        let invitation = await User.relatedQuery('sandedInvites').for(senderId).insert({});
        await invitation.$relatedQuery('project').relate(projectId);
        await invitation.$relatedQuery('receiver').relate(receiverId);
        return "invitation sent"
    },

    findInvitation: async (invitationId:number)=>{
        return  ParticipateInvite.query().findById(invitationId)
    },

    findProjectForInvite: async (invite:ParticipateInvite) =>{
        return  invite.$relatedQuery('project')
    },

    findReceiverForInvite: async (invite:ParticipateInvite) =>{
        return  invite.$relatedQuery('receiver')
    },

    acceptAndDeleteInvitation: async (project:Project,receiverId:number,invitationId:number ) =>{
        await project.$relatedQuery('participants').relate(receiverId);
        await ParticipateInvite.query().deleteById(invitationId);
    },

    deleteInvite: async (inviteId:number) =>{
        await ParticipateInvite.query().deleteById(inviteId);
    }


}