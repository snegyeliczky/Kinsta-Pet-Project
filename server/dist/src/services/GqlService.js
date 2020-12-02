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
exports.GqlService = void 0;
const User_1 = __importDefault(require("../model/User"));
const UserStory_1 = __importDefault(require("../model/UserStory"));
const Task_1 = __importDefault(require("../model/Task"));
const Project_1 = __importDefault(require("../model/Project"));
const Company_1 = __importDefault(require("../model/Company"));
const MySqlService_1 = require("./MySqlService");
const GqlUtil_1 = require("../util/GqlUtil");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.GqlService = {
    estimator: (userId, userStoryId, estimation) => __awaiter(void 0, void 0, void 0, function* () {
        let userStories = yield User_1.default.relatedQuery('userStoryEstimations')
            .for(userId)
            .where('user_storyId', userStoryId);
        if (userStories.length > 0) {
            console.log(`user ${userId} updated user story ${userStoryId} estimation to: ${estimation}`);
            yield User_1.default.relatedQuery('userStoryEstimations')
                .for(userId)
                .patch({ estimation: estimation }).where('user_storyId', userStoryId);
            return 1;
        }
        else {
            console.log(`user ${userId} estimated user story ${userStoryId} to: ${estimation}`);
            let userEstimation = yield User_1.default.relatedQuery('userStoryEstimations')
                .for(userId)
                .insert({ estimation: estimation });
            yield userEstimation.$relatedQuery('userStory').relate(userStoryId);
            return 0;
        }
    }),
    updateCompany: (companyId, companyName) => __awaiter(void 0, void 0, void 0, function* () {
        yield Company_1.default.query().findById(companyId).patch({ name: companyName });
        return Company_1.default.query().findById(companyId);
    }),
    updateProject: (projectId, projectName) => __awaiter(void 0, void 0, void 0, function* () {
        yield Project_1.default.query().findById(projectId).patch({
            name: projectName
        });
        return Project_1.default.query().findById(projectId);
    }),
    updateUserStoryStatusAfterTaskStatusRefresh: (taskId) => __awaiter(void 0, void 0, void 0, function* () {
        let Story = yield GqlUtil_1.GqlUtil.checkUserStoryStatus(taskId);
        return MySqlService_1.MySqlService.updateUserStory(Story.userStoryId, { status: Story.status });
    }),
    updateUserStory: (userStory, userStoryId, businessValue) => __awaiter(void 0, void 0, void 0, function* () {
        yield UserStory_1.default.query().findById(userStoryId).patch({
            userStory: userStory,
            businessValue: businessValue
        });
        return UserStory_1.default.query().findById(userStoryId);
    }),
    updateTask: (taskId, title, description, time) => __awaiter(void 0, void 0, void 0, function* () {
        yield Task_1.default.query().findById(taskId).patch({
            title: title,
            description: description,
            time: time
        });
        return Task_1.default.query().findById(taskId);
    }),
    sendProjectParticipationInvite: (senderId, receiverId, projectId) => __awaiter(void 0, void 0, void 0, function* () {
        let projectParticipants = yield MySqlService_1.MySqlService.getProjectParticipants(projectId);
        let receiverInvites = yield MySqlService_1.MySqlService.getUserInvites(receiverId);
        if (yield GqlUtil_1.GqlUtil.checkUserHaveInvitationToProject(receiverInvites, projectId)) {
            return "user have invitation to this project";
        }
        if (projectParticipants.some((user) => {
            return user.id === receiverId;
        })) {
            return "user all ready participate in the project";
        }
        return MySqlService_1.MySqlService.sendInvite(senderId, projectId, receiverId);
    }),
    addUserToProjectAsParticipant: (userId, projectId) => __awaiter(void 0, void 0, void 0, function* () {
        return Project_1.default.relatedQuery('participants').for(projectId).relate(userId);
    }),
    acceptParticipationInvitation: (invitationId) => __awaiter(void 0, void 0, void 0, function* () {
        let invite = yield MySqlService_1.MySqlService.findInvitation(invitationId);
        try {
            let project = yield MySqlService_1.MySqlService.getProjectForInvite(invite.id);
            let receiver = yield MySqlService_1.MySqlService.findReceiverForInvite(invite);
            let participants = yield MySqlService_1.MySqlService.getProjectParticipants(project.id);
            if (!participants.some((user) => {
                return user.id === receiver.id;
            })) {
                yield MySqlService_1.MySqlService.acceptAndDeleteInvitation(project, receiver.id, invitationId);
                return "invite accepted";
            }
            yield MySqlService_1.MySqlService.deleteInvite(invitationId);
            return "User participating in project";
        }
        catch (e) {
            return "Invitation is invalid! Refresh The Page!";
        }
    }),
    addUserToCompany: (userId, companyId) => __awaiter(void 0, void 0, void 0, function* () {
        let users = yield Company_1.default.relatedQuery('users').for(companyId);
        let isInclude = users.some(user => user.id === userId);
        if (isInclude)
            return "user is already collaborator";
        yield User_1.default.relatedQuery("companies")
            .for(userId)
            .relate(companyId);
        return "user is added as collaborator";
    }),
    getProjectForUserByCompanyId: (userId, companyId) => __awaiter(void 0, void 0, void 0, function* () {
        let projects = yield User_1.default.relatedQuery('participate')
            .for(userId)
            .where('companyId', companyId);
        return projects;
    }),
    registerUser: (FirstName, LastName, Email, Password) => __awaiter(void 0, void 0, void 0, function* () {
        const saltRound = 10;
        let hashedPsw = yield bcrypt_1.default.hash(Password, saltRound);
        return MySqlService_1.MySqlService.saveNewUser(FirstName, LastName, Email, hashedPsw);
    }),
    loginUser: (Email, Password) => __awaiter(void 0, void 0, void 0, function* () {
        let userByEmail = yield MySqlService_1.MySqlService.getUserByEmail(Email);
        if (userByEmail.length > 0) {
            let hash = userByEmail[0].password;
            let isLogin = yield bcrypt_1.default.compare(Password, hash);
            if (isLogin)
                return userByEmail[0];
        }
        return new Error("Invalid username or password!");
    })
};
