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
exports.MySqlService = void 0;
const Project_1 = __importDefault(require("../model/Project"));
const UserStory_1 = __importDefault(require("../model/UserStory"));
const User_1 = __importDefault(require("../model/User"));
const Task_1 = __importDefault(require("../model/Task"));
const ParticipateInvite_1 = __importDefault(require("../model/ParticipateInvite"));
exports.MySqlService = {
    getUserStoriesByProjectId: (projectId) => __awaiter(void 0, void 0, void 0, function* () {
        return Project_1.default.relatedQuery('userStories').for(projectId);
    }),
    getTasksForUserStory: (userStory) => __awaiter(void 0, void 0, void 0, function* () {
        return userStory.$relatedQuery('tasks').for(userStory.id);
    }),
    getTasksForUser: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return User_1.default.relatedQuery('tasks').for(userId);
    }),
    getUserStoryForTask: (taskId) => {
        return Task_1.default.relatedQuery('userStory').for(taskId);
    },
    updateUserStory: (userStoryId, update) => __awaiter(void 0, void 0, void 0, function* () {
        yield UserStory_1.default.query().findById(userStoryId).patch(update);
        return UserStory_1.default.query().findById(userStoryId);
    }),
    getProjectParticipants: (projectId) => __awaiter(void 0, void 0, void 0, function* () {
        return Project_1.default.relatedQuery('participants').for(projectId);
    }),
    getUserInvites: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return User_1.default.relatedQuery('receivedInvites').for(userId);
    }),
    getProjectForInvite: (inviteId) => __awaiter(void 0, void 0, void 0, function* () {
        let projectInList = yield ParticipateInvite_1.default.relatedQuery('project').for(inviteId);
        return projectInList[0];
    }),
    sendInvite: (senderId, projectId, receiverId) => __awaiter(void 0, void 0, void 0, function* () {
        let invitation = yield User_1.default.relatedQuery('sandedInvites').for(senderId).insert({});
        yield invitation.$relatedQuery('project').relate(projectId);
        yield invitation.$relatedQuery('receiver').relate(receiverId);
        return "invitation sent";
    }),
    findInvitation: (invitationId) => __awaiter(void 0, void 0, void 0, function* () {
        return ParticipateInvite_1.default.query().findById(invitationId);
    }),
    findReceiverForInvite: (invite) => __awaiter(void 0, void 0, void 0, function* () {
        return invite.$relatedQuery('receiver');
    }),
    acceptAndDeleteInvitation: (project, receiverId, invitationId) => __awaiter(void 0, void 0, void 0, function* () {
        yield project.$relatedQuery('participants').relate(receiverId);
        yield ParticipateInvite_1.default.query().deleteById(invitationId);
    }),
    deleteInvite: (inviteId) => __awaiter(void 0, void 0, void 0, function* () {
        yield ParticipateInvite_1.default.query().deleteById(inviteId);
    }),
    addOwnerToUserStory: (userId, userStoryId) => __awaiter(void 0, void 0, void 0, function* () {
        yield UserStory_1.default.relatedQuery('owner').for(userStoryId).relate(userId);
        if (userId === null) {
            return null;
        }
        return User_1.default.query().findById(userId);
    }),
    addNewCompany: (userId, companyName) => __awaiter(void 0, void 0, void 0, function* () {
        let newCompany = yield User_1.default.relatedQuery("companies")
            .for(userId)
            .insert({ name: companyName });
        yield newCompany.$relatedQuery('ownerUser').relate(userId);
        return newCompany;
    }),
    saveNewUser: (FirstName, LastName, Email, Password) => __awaiter(void 0, void 0, void 0, function* () {
        return User_1.default.query().insert({
            firstName: FirstName,
            lastName: LastName,
            email: Email,
            password: Password,
        });
    }),
    getUserByEmail: (Email) => __awaiter(void 0, void 0, void 0, function* () {
        return User_1.default.query().where('email', '=', Email);
    })
};
