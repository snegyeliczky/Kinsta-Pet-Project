import User from "../model/User";
import Company from "../model/Company";
import Project from "../model/Project";
import UserStory from "../model/UserStory";
import Task from "../model/Task";
import UserEstimation from "../model/UserEstimation";
import {GqlService} from "../services/GqlService";
import {GqlUtil} from "../util/GqlUtil";
import ParticipateInvite from "../model/ParticipateInvite";
import {MySqlService} from "../services/MySqlService";

export const resolvers = {
    Query: {
        users: () => User.query(),
        user: (parent: User, args: { id: number }) => {
            return User.query().findById(args.id);
        },
        getCompaniesForUser: (parent: User, args: { userId: number }) => {
            return User.relatedQuery('companies').for(args.userId)
        },
        getInvitesForParticipation: (parent: User, args: { userId: number }) => {
            return GqlUtil.getProjectInvitationsForUser(args.userId);
        },
        login: (parent:User, args:{email:string, password:string})=>{
            return GqlService.loginUser(args.email,args.password)
        },
        companies: () => Company.query(),
        company: (parent: Company, args: { id: number }) => {
            return Company.query().findById(args.id);
        },

        projects: () => Project.query(),
        project: (parent: Project, args: { id: number }) => {
            return Project.query().findById(args.id);
        },
        projectsForCompanyByUser: async (parent: Project, args: { userId: number, companyId: number }) => {
            return GqlService.getProjectForUserByCompanyId(args.userId, args.companyId);
        },

        userStories: () => UserStory.query(),
        userStory: (parent: UserStory, args: { id: number }) => {
            return UserStory.query().findById(args.id);
        },
        getUserStoryEstimations: (parent: UserStory, args: { userStoryId: number }) => {
            return UserStory.relatedQuery('estimatedUsers').for(args.userStoryId)
        },

        tasks: () => Task.query(),
        task: (parent: Task, args: { id: number }) => {
            return Task.query().findById(args.id);
        },
        unFinishedTasks: (parent: Task, args: { userId: number }) => {
            return GqlUtil.unFinishedTasksForUser(args.userId);
        },
        geTasksDistributionForProject: (parent: Task, args: { projectId: number }) => {
            return GqlUtil.geTasksDistributionForProject(args.projectId);
        }
    },

    Mutation: {
        addNewUser: (
            parent: User,
            args: {
                FirstName: string;
                LastName: string;
                Email: string;
                Password: string;
            }
        ) => {
            return GqlService.registerUser(args.FirstName,args.LastName, args.Email, args.Password)
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
            }) => {
            let newTask = await UserStory.relatedQuery('tasks').for(args.userStoryId)
                .insert({title: args.taskTitle, description: args.taskDescription, ready: false, time: args.time});
            if (args.ownerId) await Task.relatedQuery('owner').for(newTask.id).relate(args.ownerId);
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
        deleteTask: (parent: Task, args: { taskId: number }) => {
            return Task.query().deleteById(args.taskId);
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
        updateTaskStatus: async (parent: Task, args: { taskId: number, taskStatus: boolean }) => {
            await Task.query().findById(args.taskId).patch({ready: args.taskStatus});
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
    },

    User: {
        id: (parent: User) => parent.id,
        firstName: (parent: User) => parent.firstName,
        lastName: (parent: User) => parent.lastName,
        email: (parent: User) => parent.email,
        companies: (parent: User) => {
            return User.relatedQuery("companies").for(parent.id);
        },
        participate: (parent: User) => {
            return User.relatedQuery('participate').for(parent.id)
        },
        userStoryEstimations: (parent: User) => {
            return User.relatedQuery('userStoryEstimations').for(parent.id)
        },
        invites: (parent: User) => {
            return User.relatedQuery('receivedInvites').for(parent.id)
        },
        sentInviter: (parent: User) => {
            return User.relatedQuery('sandedInvites').for(parent.id)
        }
    },

    Company: {
        id: (parent: Company) => parent.id,
        name: (parent: Company) => parent.name,
        ownerUser: async (parent: Company) => {
            let userInList = await Company.relatedQuery("ownerUser").for(parent.id);
            return userInList[0]
        },
        users: (parent: Company) => {
            return Company.relatedQuery("users").for(parent.id);
        },
        projects: (parent: Company) => {
            return Company.relatedQuery("projects").for(parent.id);
        },
    },

    Project: {
        id: (parent: Project) => parent.id,
        company: async (parent: Project) => {
            let companyInList = await Project.relatedQuery("company").for(parent.id);
            return companyInList[0];
        },
        name: (parent: Project) => parent.name,
        owner: async (parent: Project) => {
            let ownerInList = await Project.relatedQuery("owner").for(parent.id);
            return ownerInList[0];
        },
        participants: (parent: Project) => {
            return Project.relatedQuery("participants").for(parent.id);
        },
        userStories: (parent: Project) => {
            return Project.relatedQuery("userStories").for(parent.id);
        },
    },

    UserStory: {
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
    },

    Task: {
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
    },
    UserEstimation: {
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
    },
    ParticipateInvite: {
        id: (parent: ParticipateInvite) => parent.id,
        sander: async (parent: ParticipateInvite) => {
            let su = await ParticipateInvite.relatedQuery('sander').for(parent.id);
            return su[0];
        },
        receiver: async (parent: ParticipateInvite) => {
            let ru = await ParticipateInvite.relatedQuery('receiver').for(parent.id);
            return ru[0]
        },
        project: async (parent: ParticipateInvite) => {
            let pl = await ParticipateInvite.relatedQuery('project').for(parent.id);
            return pl[0];
        }
    },
    TaskDistribution: {
        finishedTasks: (parent: { finishedTasks: number, allTasks: number }) => parent.finishedTasks,
        allTasks: (parent: { finishedTasks: number, allTasks: number }) => parent.allTasks
    }
};
