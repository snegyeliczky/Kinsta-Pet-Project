import User from "../model/User";
import UserStory from "../model/UserStory";
import Task from "../model/Task";
import Project from "../model/Project";
import Company from "../model/Company";
import {MySqlService} from "./MySqlService";
import {GqlUtil} from "../util/GqlUtil";
import bcrypt from "bcrypt";
import {response} from "express";
import has = Reflect.has;
import {company} from "../resolvers/ModelResolvers/CompanyResolver";

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

    updateCompany: async (companyId: number, companyName: string) => {
        await Company.query().findById(companyId).patch({name: companyName});
        return Company.query().findById(companyId);
    },

    updateProject: async (projectId: number, projectName: string) => {
        await Project.query().findById(projectId).patch({
            name: projectName
        });
        return Project.query().findById(projectId);
    },

    updateUserStoryStatusAfterTaskStatusRefresh: async (taskId: number) => {
        let Story = await GqlUtil.checkUserStoryStatus(taskId);
        return MySqlService.updateUserStory(Story.userStoryId, {status: Story.status});
    },

    updateUserStory: async (userStory: string,
                            userStoryId: number, businessValue: number, context: any) => {
        await UserStory.query().findById(userStoryId).patch({
            userStory: userStory,
            businessValue: businessValue
        });
        let updatedUserStory = await UserStory.query().findById(userStoryId);
        let project = await UserStory.relatedQuery("project").for(updatedUserStory.id);

        context.pubSub.publish("NEW_USER_STORY", {
            newUserStory: updatedUserStory,
            projectId: project[0].id
        });

        return updatedUserStory;
    },

    updateTask: async (taskId: number, title: string,
                       description: string, time: string, context: any) => {
        await Task.query().findById(taskId).patch({
            title: title,
            description: description,
            time: time
        });
        let updatedTask = await Task.query().findById(taskId);
        context.pubSub.publish("NEW_TASK", {
            newTask: updatedTask
        });
        return updatedTask;
    },

    sendProjectParticipationInvite: async (senderId: number, receiverId: number, projectId: number, context: any) => {
        let projectParticipants = await MySqlService.getProjectParticipants(projectId);
        let receiverInvites = await MySqlService.getUserInvites(receiverId);
        if (await GqlUtil.checkUserHaveInvitationToProject(receiverInvites, projectId)) {
            return "user have invitation to this project"
        }
        if (projectParticipants.some((user: User) => {
            return user.id === receiverId
        })) {
            return "user already participate in the project"
        }
        return MySqlService.sendInvite(senderId, projectId, receiverId, context);
    },

    addUserToProjectAsParticipant: async (userId: number, projectId: number) => {
        return Project.relatedQuery('participants').for(projectId).relate(userId);
    },

    addUserToCompany: async (userId: number, companyId: number) => {
        let users = await Company.relatedQuery('users').for(companyId);
        let isInclude = users.some(user => user.id === userId);
        if (isInclude) return "user is already collaborator";
        await User.relatedQuery("companies")
            .for(userId)
            .relate(companyId);
        return "user is added as collaborator";
    },

    acceptParticipationInvitation: async (invitationId: number, context: any) => {
        let invite = await MySqlService.findInvitation(invitationId);
        try {
            let project = await MySqlService.getProjectForInvite(invite.id);
            let receiver = await MySqlService.findReceiverForInvite(invite);
            let participants = await MySqlService.getProjectParticipants(project.id);
            if (!participants.some((user: User) => {
                return user.id === receiver.id
            })) {
                let company = await MySqlService.getCompanyForProject(project.id);
                await GqlService.addUserToCompany(receiver.id, company.id);
                await MySqlService.acceptAndDeleteInvitation(project, receiver.id, invitationId);
                //subscription return receiver
                context.pubSub.publish("JOIN_PARTICIPANT", {
                    joinParticipation: receiver,
                    projectId: project.id
                });
                return "invite accepted"
            }
            await MySqlService.deleteInvite(invitationId);
            return "User participating in project";
        } catch (e) {
            return "Invitation is invalid! Refresh The Page!"
        }

    },

    getProjectForUserByCompanyId: async (userId: number, companyId: number) => {
        let projects = await User.relatedQuery('participate')
            .for(userId)
            .where('companyId', companyId);
        return projects;
    },

    registerUser: async (FirstName: string, LastName: string,
                         Email: string, Password: string) => {
        const saltRound = 10;
        let hashedPsw = await bcrypt.hash(Password, saltRound);
        return MySqlService.saveNewUser(FirstName, LastName, Email, hashedPsw);
    },

    loginUser: async (Email: string, Password: string) => {
        let userByEmail = await MySqlService.getUserByEmail(Email);
        if (userByEmail.length > 0) {
            let hash = userByEmail[0].password;
            let isLogin = await bcrypt.compare(Password, hash);
            if (isLogin) return userByEmail[0];
        }
        return new Error("Invalid username or password!")
    }
};



