"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const User_1 = __importDefault(require("../model/User"));
const Company_1 = __importDefault(require("../model/Company"));
const Project_1 = __importDefault(require("../model/Project"));
const UserStory_1 = __importDefault(require("../model/UserStory"));
const Task_1 = __importDefault(require("../model/Task"));
const UserEstimation_1 = __importDefault(require("../model/UserEstimation"));
const GqlService_1 = require("../services/GqlService");
const GqlUtil_1 = require("../util/GqlUtil");
const ParticipateInvite_1 = __importDefault(require("../model/ParticipateInvite"));
const MySqlService_1 = require("../services/MySqlService");
exports.resolvers = {
    Query: {
        users: () => User_1.default.query(),
        user: (parent, args) => {
            return User_1.default.query().findById(args.id);
        },
        getCompaniesForUser: (parent, args) => {
            return User_1.default.relatedQuery('companies').for(args.userId);
        },
        getInvitesForParticipation: (parent, args) => {
            return GqlUtil_1.GqlUtil.getProjectInvitationsForUser(args.userId);
        },
        login: (parent, args) => {
            return GqlService_1.GqlService.loginUser(args.email, args.password);
        },
        companies: () => Company_1.default.query(),
        company: (parent, args) => {
            return Company_1.default.query().findById(args.id);
        },
        projects: () => Project_1.default.query(),
        project: (parent, args) => {
            return Project_1.default.query().findById(args.id);
        },
        projectsForCompanyByUser: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return GqlService_1.GqlService.getProjectForUserByCompanyId(args.userId, args.companyId);
        }),
        userStories: () => UserStory_1.default.query(),
        userStory: (parent, args) => {
            return UserStory_1.default.query().findById(args.id);
        },
        getUserStoryEstimations: (parent, args) => {
            return UserStory_1.default.relatedQuery('estimatedUsers').for(args.userStoryId);
        },
        tasks: () => Task_1.default.query(),
        task: (parent, args) => {
            return Task_1.default.query().findById(args.id);
        },
        unFinishedTasks: (parent, args) => {
            return GqlUtil_1.GqlUtil.unFinishedTasksForUser(args.userId);
        },
        geTasksDistributionForProject: (parent, args) => {
            return GqlUtil_1.GqlUtil.geTasksDistributionForProject(args.projectId);
        }
    },
    Mutation: {
        addNewUser: (parent, args) => {
            return GqlService_1.GqlService.registerUser(args.FirstName, args.LastName, args.Email, args.Password);
        },
        addNewCompany: (parent, args) => {
            return MySqlService_1.MySqlService.addNewCompany(args.userId, args.CompanyName);
        },
        addNewProject: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            let newProject = yield Company_1.default.relatedQuery("projects")
                .for(args.companyId)
                .insert({ name: args.projectName });
            yield newProject.$relatedQuery("owner").relate(args.userId);
            yield newProject.$relatedQuery('participants').relate(args.userId);
            return newProject;
        }),
        addNewUserStory: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            let newUserStory = yield Project_1.default.relatedQuery("userStories")
                .for(args.projectId)
                .insert({ userStory: args.userStory, status: false, businessValue: args.businessValue });
            console.log(newUserStory);
            yield newUserStory.$relatedQuery("owner").relate(args.userId);
            console.log(newUserStory);
            return newUserStory;
        }),
        addNewTask: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            let newTask = yield UserStory_1.default.relatedQuery('tasks').for(args.userStoryId)
                .insert({ title: args.taskTitle, description: args.taskDescription, ready: false, time: args.time });
            if (args.ownerId)
                yield Task_1.default.relatedQuery('owner').for(newTask.id).relate(args.ownerId);
            yield GqlService_1.GqlService.updateUserStoryStatusAfterTaskStatusRefresh(parseInt(newTask.id));
            context.pubsub.publish("NEW_TASK", {
                newTaskObj: newTask
            });
            return newTask;
        }),
        addUserToCompany: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return GqlService_1.GqlService.addUserToCompany(args.userId, args.companyId);
        }),
        addOwnerToProject: (parent, args) => {
            return Project_1.default.relatedQuery('owner').for(args.projectId).relate(args.userId);
        },
        addOwnerToUserStory: (parent, args) => {
            return MySqlService_1.MySqlService.addOwnerToUserStory(args.userId, args.userStoryId);
        },
        addOwnerToTask: (parent, args) => {
            return Task_1.default.relatedQuery('owner').for(args.taskId).relate(args.userId);
        },
        deleteUser: (parent, args) => {
            return User_1.default.query().deleteById(args.userId);
        },
        deleteCompany: (parent, args) => {
            return Company_1.default.query().deleteById(args.companyId);
        },
        deleteProject: (parent, args) => {
            return Project_1.default.query().deleteById(args.projectId);
        },
        deleteUserStory: (parent, args) => {
            return UserStory_1.default.query().deleteById(args.userStoryId);
        },
        deleteTask: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            let number = yield Task_1.default.query().deleteById(args.taskId);
            return number;
        }),
        updateCompany: (parent, args) => {
            return GqlService_1.GqlService.updateCompany(args.companyId, args.companyName);
        },
        updateProject: (parent, args) => {
            return GqlService_1.GqlService.updateProject(args.projectId, args.projectName);
        },
        updateUserStory: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return GqlService_1.GqlService.updateUserStory(args.userStory, args.userStoryId, args.businessValue);
        }),
        // update the task status and return the userStory status
        updateTaskStatus: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            yield Task_1.default.query().findById(args.taskId).patch({ ready: args.taskStatus });
            return GqlService_1.GqlService.updateUserStoryStatusAfterTaskStatusRefresh(args.taskId);
        }),
        updateTask: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return GqlService_1.GqlService.updateTask(args.taskId, args.title, args.description, args.time);
        }),
        // if user doesn't estimate the story creat new estimation else update the existing one
        estimateUserStory: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield GqlService_1.GqlService.estimator(args.userId, args.userStoryId, args.estimation);
        }),
        sendParticipateInviteToUser: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield GqlService_1.GqlService.sendProjectParticipationInvite(args.senderId, args.receiverId, args.projectId);
        }),
        acceptParticipationInvite: (parent, args) => {
            return GqlService_1.GqlService.acceptParticipationInvitation(args.invitationId);
        },
    },
    Subscription: {
        newTask: {
            subscribe: (parent, args, Context) => {
                Context.pubsub.asyncIterator("NEW_TASK");
            }
        }
    },
    User: {
        id: (parent) => parent.id,
        firstName: (parent) => parent.firstName,
        lastName: (parent) => parent.lastName,
        email: (parent) => parent.email,
        companies: (parent) => {
            return User_1.default.relatedQuery("companies").for(parent.id);
        },
        participate: (parent) => {
            return User_1.default.relatedQuery('participate').for(parent.id);
        },
        userStoryEstimations: (parent) => {
            return User_1.default.relatedQuery('userStoryEstimations').for(parent.id);
        },
        invites: (parent) => {
            return User_1.default.relatedQuery('receivedInvites').for(parent.id);
        },
        sentInviter: (parent) => {
            return User_1.default.relatedQuery('sandedInvites').for(parent.id);
        }
    },
    Company: {
        id: (parent) => parent.id,
        name: (parent) => parent.name,
        ownerUser: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            let userInList = yield Company_1.default.relatedQuery("ownerUser").for(parent.id);
            return userInList[0];
        }),
        users: (parent) => {
            return Company_1.default.relatedQuery("users").for(parent.id);
        },
        projects: (parent) => {
            return Company_1.default.relatedQuery("projects").for(parent.id);
        },
    },
    Project: {
        id: (parent) => parent.id,
        company: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            let companyInList = yield Project_1.default.relatedQuery("company").for(parent.id);
            return companyInList[0];
        }),
        name: (parent) => parent.name,
        owner: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            let ownerInList = yield Project_1.default.relatedQuery("owner").for(parent.id);
            return ownerInList[0];
        }),
        participants: (parent) => {
            return Project_1.default.relatedQuery("participants").for(parent.id);
        },
        userStories: (parent) => {
            return Project_1.default.relatedQuery("userStories").for(parent.id);
        },
    },
    UserStory: {
        id: (parent) => parent.id,
        userStory: (parent) => parent.userStory,
        project: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            let projectList = yield UserStory_1.default.relatedQuery("project").for(parent.id);
            return projectList[0];
        }),
        status: (parent) => parent.status,
        businessValue: (parent) => parent.businessValue,
        owner: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            let ownerList = yield UserStory_1.default.relatedQuery("owner").for(parent.id);
            return ownerList[0];
        }),
        estimatedUsers: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            return UserStory_1.default.relatedQuery("estimatedUsers").for(parent.id);
        }),
        tasks: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            return UserStory_1.default.relatedQuery("tasks").for(parent.id);
        }),
    },
    Task: {
        id: (parent) => parent.id,
        title: (parent) => parent.title,
        description: (parent) => parent.description,
        ready: (parent) => parent.ready,
        time: (parent) => parent.time,
        userStory: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            let userStoryInList = yield Task_1.default.relatedQuery("userStory").for(parent.id);
            return userStoryInList[0];
        }),
        owner: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            let ownerInList = yield Task_1.default.relatedQuery("owner").for(parent.id);
            return ownerInList[0];
        }),
    },
    UserEstimation: {
        id: (parent) => parent.id,
        estimation: (parent) => parent.estimation,
        owner: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            let ownerList = yield UserEstimation_1.default.relatedQuery('owner').for(parent.id);
            return ownerList[0];
        }),
        userStory: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            let storyList = yield UserEstimation_1.default.relatedQuery('userStory').for(parent.id);
            return storyList[0];
        }),
    },
    ParticipateInvite: {
        id: (parent) => parent.id,
        sander: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            let su = yield ParticipateInvite_1.default.relatedQuery('sander').for(parent.id);
            return su[0];
        }),
        receiver: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            let ru = yield ParticipateInvite_1.default.relatedQuery('receiver').for(parent.id);
            return ru[0];
        }),
        project: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            let pl = yield ParticipateInvite_1.default.relatedQuery('project').for(parent.id);
            return pl[0];
        })
    },
    TaskDistribution: {
        finishedTasks: (parent) => parent.finishedTasks,
        allTasks: (parent) => parent.allTasks
    }
};
