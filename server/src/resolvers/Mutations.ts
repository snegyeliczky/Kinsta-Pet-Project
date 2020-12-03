import User from "../model/User";
import {GqlService} from "../services/GqlService";
import Company from "../model/Company";
import {MySqlService} from "../services/MySqlService";
import Project from "../model/Project";
import UserStory from "../model/UserStory";
import Task from "../model/Task";
import UserEstimation from "../model/UserEstimation";

export const mutations = {
    addNewUser: (
        parent: User,
        args: {
            FirstName: string;
            LastName: string;
            Email: string;
            Password: string;
        }
    ) => {
        return GqlService.registerUser(args.FirstName, args.LastName, args.Email, args.Password)
    },

    addNewCompany: (
        parent: Company,
        args: { userId: number; CompanyName: string }
    ) => {
        return MySqlService.addNewCompany(args.userId, args.CompanyName);
    },

    addNewProject: async (
        parent: Project,
        args: { userId: number; companyId: number; projectName: string }
    ) => {
        let newProject = await Company.relatedQuery("projects")
            .for(args.companyId)
            .insert({name: args.projectName});
        await newProject.$relatedQuery("owner").relate(args.userId);
        await newProject.$relatedQuery('participants').relate(args.userId);
        return newProject;
    },

    addNewUserStory: async (
        parent: UserStory,
        args: { userId: number; projectId: number; userStory: string, businessValue: number }
    ) => {
        let newUserStory = await Project.relatedQuery("userStories")
            .for(args.projectId)
            .insert({userStory: args.userStory, status: false, businessValue: args.businessValue});
        console.log(newUserStory);
        await newUserStory.$relatedQuery("owner").relate(args.userId);
        console.log(newUserStory);
        return newUserStory;
    },

    addNewTask: async (
        parent: Task,
        args: {
            userStoryId: number, taskTitle: string,
            taskDescription: string, ownerId: number,
            time: string
        },
        context: any) => {
        let newTask = await UserStory.relatedQuery('tasks').for(args.userStoryId)
            .insert({title: args.taskTitle, description: args.taskDescription, ready: false, time: args.time});
        if (args.ownerId) await Task.relatedQuery('owner').for(newTask.id).relate(args.ownerId);
        await GqlService.updateUserStoryStatusAfterTaskStatusRefresh(parseInt(newTask.id));
        let extendedTasks = await MySqlService.getTasksByUserStoryId(args.userStoryId);
/*
        context.pubSub.publish("NEW_TASK_FOR_USER_STORY", {
            tasksForUserStory: extendedTasks
        });

 */

        context.pubSub.publish("NEW_TASK", {
            newTask: newTask
        });


        return newTask
    },

    addUserToCompany: async (
        parent: Company,
        args: { userId: number; companyId: number }
    ) => {
        return GqlService.addUserToCompany(args.userId, args.companyId);
    },

    addOwnerToProject: (parent: Project, args: { userId: number, projectId: number }) => {
        return Project.relatedQuery('owner').for(args.projectId).relate(args.userId);
    },

    addOwnerToUserStory: (parent: UserStory, args: { userId: number, userStoryId: number }) => {
        return MySqlService.addOwnerToUserStory(args.userId, args.userStoryId);
    },

    addOwnerToTask: (parent: Task, args: { userId: number, taskId: number }) => {
        return Task.relatedQuery('owner').for(args.taskId).relate(args.userId);
    },

    deleteUser: (parent: Company, args: { userId: number }) => {
        return User.query().deleteById(args.userId)
    },

    deleteCompany: (parent: Company, args: { companyId: number }) => {
        return Company.query().deleteById(args.companyId)
    },

    deleteProject: (parent: Project, args: { projectId: number }) => {
        return Project.query().deleteById(args.projectId);
    },

    deleteUserStory: (parent: UserStory, args: { userStoryId: number }) => {
        return UserStory.query().deleteById(args.userStoryId);
    },

    deleteTask: async (parent: Task, args: { taskId: number }) => {
        let number = await Task.query().deleteById(args.taskId);
        return number;
    },

    updateCompany: (parent: Company, args: { companyId: number, companyName: string }) => {
        return GqlService.updateCompany(args.companyId, args.companyName)
    },

    updateProject: (parent: Project, args: { projectId: number, projectName: string }) => {
        return GqlService.updateProject(args.projectId, args.projectName)
    },

    updateUserStory: async (
        parent: UserStory,
        args: {
            userStory: string;
            userStoryId: number; businessValue: number
        }) => {
        return GqlService.updateUserStory(args.userStory, args.userStoryId, args.businessValue);
    },

    // update the task status and return the userStory status
    updateTaskStatus: async (parent: Task, args: { taskId: number, taskStatus: boolean }, context:any) => {
        await Task.query().findById(args.taskId).patch({ready: args.taskStatus});
        let userStory = await Task.relatedQuery('userStory').for(args.taskId);
        let extendedTasks = await MySqlService.getTasksByUserStoryId(userStory[0].id);
        await context.pubSub.publish("NEW_TASK_FOR_USER_STORY", {
            tasksForUserStory: extendedTasks
        });
        return GqlService.updateUserStoryStatusAfterTaskStatusRefresh(args.taskId);
    },

    updateTask: async (parent: Task, args: {
        taskId: number, title: string,
        description: string, time: string
    }) => {
        return GqlService.updateTask(args.taskId, args.title, args.description, args.time)
    },

    // if user doesn't estimate the story creat new estimation else update the existing one
    estimateUserStory: async (
        parent: UserEstimation,
        args: { userId: number, userStoryId: number, estimation: number }
    ) => {
        return await GqlService.estimator(args.userId, args.userStoryId, args.estimation)
    },

    sendParticipateInviteToUser: async (parent: any, args: { senderId: number, receiverId: number, projectId: number }) => {
        return await GqlService.sendProjectParticipationInvite(args.senderId, args.receiverId, args.projectId);
    },

    acceptParticipationInvite: (parent: any, args: { invitationId: number }) => {
        return GqlService.acceptParticipationInvitation(args.invitationId);
    },
}