import User from "../model/User";
import {GqlUtil} from "../util/GqlUtil";
import {GqlService} from "../services/GqlService";
import Company from "../model/Company";
import Project from "../model/Project";
import UserStory from "../model/UserStory";
import Task from "../model/Task";
import {MySqlService} from "../services/MySqlService";

export const queries = {
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

    login: (parent: User, args: { email: string, password: string }) => {
        return GqlService.loginUser(args.email, args.password)
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
    },

    getUserByEmail:(parent:User, args:{email:String}) =>{
        return MySqlService.getUserByEmailPart(args.email);
    }
};