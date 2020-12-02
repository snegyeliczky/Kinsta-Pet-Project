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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySqlService = void 0;
exports.MySqlService = {
    getUserStoriesByProjectId: (projectId) => {
        return [{ id: 1 }, { id: 2 }];
    },
    getTasksForUserStory: (userStory) => {
        if (userStory.id === 1) {
            return [{ id: 1, ready: 1 }, { id: 2, ready: 1 }];
        }
        if (userStory.id === 2) {
            return [{ id: 3, ready: 0 }, { id: 4, ready: 1 }];
        }
        else {
            return [{ id: 5, ready: 0 }, { id: 6, ready: 0 }];
        }
    },
    getTasksForUser: (userId) => {
        return [{ id: 1, ready: 0, title: "not ready" }, { id: 2, ready: 1, title: "ready" }];
    },
    getUserStoryForTask: (taskId) => {
        if (taskId === 1 || taskId === 2) {
            return [
                {
                    id: 1,
                    userId: 1,
                    projectId: 1,
                    userStory: 'frontend colors shames',
                    status: 0,
                    businessValue: null
                }
            ];
        }
        if (taskId === 3 || taskId === 4) {
            return [
                {
                    id: 2,
                    userId: 1,
                    projectId: 1,
                    userStory: 'frontend colors shames',
                    status: 0,
                    businessValue: null
                }
            ];
        }
        else {
            return [
                {
                    id: 3,
                    userId: 1,
                    projectId: 1,
                    userStory: 'frontend colors shames',
                    status: 0,
                    businessValue: null
                }
            ];
        }
    },
    getProjectParticipants: (projectId) => __awaiter(void 0, void 0, void 0, function* () {
        if (projectId === 1) {
            return [{
                    id: 1, firstName: 'JhonLine',
                    lastName: 'Szilvester', password: '432x',
                    email: 'JS@gmail.com', address: null
                }
            ];
        }
        if (projectId === 2) {
            return [{
                    id: 2, firstName: 'Jone',
                    lastName: 'Wick', password: '4321',
                    email: 'JW@gmail.com', address: null
                }
            ];
        }
        else {
            return [];
        }
    }),
    getUserInvites: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        if (userId === 1) {
            return [
                {
                    id: 2, sander: 2,
                    receiver: 1, project: 2
                }
            ];
        }
        else {
            return [];
        }
    }),
    getProjectForInvite: (inviteId) => __awaiter(void 0, void 0, void 0, function* () {
        if (inviteId === 1) {
            return {
                id: 1,
                companyId: 1,
                ownerId: 1,
                name: 'New cash machine system'
            };
        }
        if (inviteId === 2) {
            return {
                id: 2,
                companyId: 1,
                ownerId: 1,
                name: 'New test project'
            };
        }
        if (inviteId === undefined) {
            throw new TypeError("Invitation doesn't exist");
        }
    }),
    sendInvite: (senderId, projectId, receiverId) => __awaiter(void 0, void 0, void 0, function* () {
        return "invitation sent";
    }),
    findInvitation: (invitationId) => __awaiter(void 0, void 0, void 0, function* () {
        if (invitationId === 1) {
            return {
                id: 1, sander: 2,
                receiver: 1, project: 1
            };
        }
        if (invitationId === 2) {
            return {
                id: 2, sander: 2,
                receiver: 1, project: 2
            };
        }
        else
            return {};
    }),
    findReceiverForInvite: (invite) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            id: 1, firstName: 'JhonLine',
            lastName: 'Szilvester', password: '432x',
            email: 'JS@gmail.com', address: null
        };
    }),
    acceptAndDeleteInvitation: (project, receiverId, invitationId) => __awaiter(void 0, void 0, void 0, function* () {
        return true;
    }),
    deleteInvite: (inviteId) => __awaiter(void 0, void 0, void 0, function* () {
        return true;
    })
};
