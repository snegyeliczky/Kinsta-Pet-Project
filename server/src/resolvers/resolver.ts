
import Task from "../model/Task";
import UserEstimation from "../model/UserEstimation";
import ParticipateInvite from "../model/ParticipateInvite";
import {queries} from "./Queries";
import {mutations} from "./Mutations";
import {subscriptions} from "./Subscriptions";
import {user} from "./ModelResolvers/UserResolver";
import {company} from "./ModelResolvers/CompanyResolver";
import {project} from "./ModelResolvers/ProjectResolver";
import {userStory} from "./ModelResolvers/UserStoryResolver";
import {task} from "./ModelResolvers/TaskResolver";
import {userEstimation} from "./ModelResolvers/UserEstimationResolver";
import {participateInvite} from "./ModelResolvers/ParticipateInviteResolver";
import {taskDistribution} from "./ModelResolvers/TaskDistributionResolver";


export const resolvers = {
    Query: queries,

    Mutation: mutations,

    Subscription: subscriptions,

    User: user,

    Company: company,

    Project: project,

    UserStory: userStory,

    Task: task,

    UserEstimation: userEstimation,

    ParticipateInvite: participateInvite,

    TaskDistribution: taskDistribution
};
