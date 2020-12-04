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
exports.GqlUtil = void 0;
const User_1 = __importDefault(require("../model/User"));
const MySqlService_1 = require("../services/MySqlService");
exports.GqlUtil = {
    checkUserStoryStatus: (taskId) => __awaiter(void 0, void 0, void 0, function* () {
        let userStoryInList = yield MySqlService_1.MySqlService.getUserStoryForTask(taskId);
        let userStory = userStoryInList[0];
        let tasks = yield MySqlService_1.MySqlService.getTasksForUserStory(userStory);
        if (tasks.length > 0) {
            let ready = tasks.reduce((re, task) => {
                if (!task.ready) {
                    re.status = false;
                }
                return re;
            }, { status: true });
            return { userStoryId: userStory.id, status: ready.status };
        }
        else
            return { userStoryId: userStory.id, status: false };
    }),
    checkUserHaveInvitationToProject: (receiverInvites, projectId) => __awaiter(void 0, void 0, void 0, function* () {
        for (let invite of receiverInvites) {
            let project = yield MySqlService_1.MySqlService.getProjectForInvite(invite.id);
            if (project.id === projectId)
                return true;
        }
        return false;
    }),
    unFinishedTasksForUser: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        let userTasks = yield MySqlService_1.MySqlService.getTasksForUser(userId);
        return userTasks.filter(task => {
            if (!task.ready) {
                return task;
            }
        });
    }),
    getProjectInvitationsForUser: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return User_1.default.relatedQuery('receivedInvites').for(userId);
    }),
    geTasksDistributionForProject: (projectId) => __awaiter(void 0, void 0, void 0, function* () {
        let userStories = yield MySqlService_1.MySqlService.getUserStoriesByProjectId(projectId);
        let finishedTasks = 0;
        let allTask = 0;
        for (let us of userStories) {
            let tasks = yield MySqlService_1.MySqlService.getTasksForUserStory(us);
            let filtered = tasks.filter(t => {
                return !!t.ready === true;
            });
            finishedTasks += filtered.length;
            allTask += tasks.length;
        }
        return { finishedTasks: finishedTasks, allTasks: allTask };
    }),
};
