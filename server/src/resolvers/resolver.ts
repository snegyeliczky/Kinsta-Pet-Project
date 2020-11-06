import User from "../model/User";
import Company from "../model/Company";
import Project from "../model/Project";
import UserStory from "../model/UserStory";
import Task from "../model/Task";
import UserEstimation from "../model/UserEstimation";
import {GqlService} from "../services/GqlService";
import {GqlUtil} from "../util/GqlUtil";

export const resolvers = {
    Query: {
        users: () => User.query(),
        user: (parent: User, args: { id: number }) => {
            return User.query().findById(args.id);
        },

        companies: () => Company.query(),
        company: (parent: Company, args: { id: number }) => {
            return Company.query().findById(args.id);
        },

        projects: () => Project.query(),
        project: (parent: Project, args: { id: number }) => {
            return Project.query().findById(args.id);
        },

        userStories: () => UserStory.query(),
        userStory: (parent: UserStory, args: { id: number }) => {
            return UserStory.query().findById(args.id);
        },

        tasks: () => Task.query(),
        task: (parent: Task, args: { id: number }) => {
            return Task.query().findById(args.id);
        },
    },

    Mutation: {
        addNewUser: (
            parent: User,
            args: {
                newFirstName: string;
                newLastName: string;
                email: string;
                password: string;
            }
        ) => {
            return User.query().insert({
                firstName: args.newFirstName,
                lastName: args.newLastName,
                email: args.email,
                password: args.password,
            });
        },
        addNewCompany: (
            parent: Company,
            args: { userId: number; CompanyName: string }
        ) => {
            return User.relatedQuery("companies")
                .for(args.userId)
                .insert({name: args.CompanyName});
        },
        addNewProject: async (
            parent: Project,
            args: { userId: number; companyId: number; projectName: string }
        ) => {
            let newProject = await Company.relatedQuery("projects")
                .for(args.companyId)
                .insert({name: args.projectName});
            await newProject.$relatedQuery("owner").relate(args.userId);
            return newProject;
        },
        addNewUserStory: async (
            parent: UserStory,
            args: { userId: number; projectId: number; userStory: string }
        ) => {
            let newUserStory = await Project.relatedQuery("userStories")
                .for(args.projectId)
                .insert({userStory: args.userStory, status: false});
            console.log(newUserStory);
            await newUserStory.$relatedQuery("owner").relate(args.userId);
            console.log(newUserStory);
            return newUserStory;
        },

        addUserToCompany: async (
            parent: Company,
            args: { userId: number; companyId: number }
        ) => {
            return User.relatedQuery("companies")
                .for(args.userId)
                .relate(args.companyId);
        },
        addOwnerToProject: (parent: Project, args: { userId: number, projectId: number }) => {
            return Project.relatedQuery('owner').for(args.projectId).relate(args.userId);
        },
        addOwnerToUserStory: (parent: UserStory, args: { userId: number, userStoryId: number }) => {
            return UserStory.relatedQuery('owner').for(args.userStoryId).relate(args.userId);
        },
        addOwnerToTask: (parent: Task, args: { userId: number, taskId: number }) => {
            return Task.relatedQuery('owner').for(args.taskId).relate(args.userId);
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

        updateUserStory: async (
            parent: UserStory,
            args: {
                ownerId: number; userStory: string;
                status: boolean; userStoryId: number;
            }) => {
            return GqlService.updateUserStory(args.ownerId, args.userStory, args.status, args.userStoryId);
        },

        // update the task status and return the userStory status
        updateTaskStatus: async (parent: Task, args: { taskId: number, taskStatus: boolean }): Promise<boolean> => {
            await Task.query().findById(args.taskId).patch({ready: args.taskStatus});
            return GqlUtil.checkUserStoryStatus(args.taskId);
        },

        // if user doesn't estimate the story creat new estimation else update the existing one
        estimateUserStory: async (
            parent: UserEstimation,
            args: { userId: number, userStoryId: number, estimation: number }
        ) => {
            return await GqlService.estimator(args.userId, args.userStoryId, args.estimation)
        }
    },

    User: {
        id: (parent: User) => parent.id,
        firstName: (parent: User) => parent.firstName,
        lastName: (parent: User) => parent.lastName,
        email: (parent: User) => parent.email,
        companies: (parent: User) => {
            return User.relatedQuery("companies").for(parent.id);
        },
        userStoryEstimations: (parent: User) => {
            return User.relatedQuery('userStoryEstimations').for(parent.id)
        }
    },

    Company: {
        id: (parent: Company) => parent.id,
        name: (parent: Company) => parent.name,
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
    }
};
