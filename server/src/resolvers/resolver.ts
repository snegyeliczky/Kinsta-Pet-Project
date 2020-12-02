import User from "../model/User";
import Company from "../model/Company";
import Project from "../model/Project";
import UserStory from "../model/UserStory";
import Task from "../model/Task";
import UserEstimation from "../model/UserEstimation";
import ParticipateInvite from "../model/ParticipateInvite";
import {queries} from "./Queries";
import {mutations} from "./Mutations";
import {subscriptions} from "./Subscriptions";


export const resolvers = {
    Query: queries,

    Mutation: mutations,

    Subscription: subscriptions,

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
