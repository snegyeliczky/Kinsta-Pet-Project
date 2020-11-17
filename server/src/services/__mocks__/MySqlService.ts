import UserStory from "../../model/UserStory";
import User from "../../model/User";
import Project from "../../model/Project";
import ParticipateInvite from "../../model/ParticipateInvite";

export const MySqlService = {

    getUserStoriesByProjectId: (projectId: number) => {
        return [{id: 1}, {id: 2}];
    },

    getTasksForUserStory: (userStory: UserStory) => {
        if (userStory.id === 1) {
            return [{id: 1, ready: 1}, {id: 2, ready: 1}];
        }
        if (userStory.id === 2) {
            return [{id: 3, ready: 0}, {id: 4, ready: 1}];
        } else {
            return [{id: 5, ready: 0}, {id: 6, ready: 0}];
        }

    },
    getTasksForUser: (userId: number) => {
        return [{id: 1, ready: 0, title: "not ready"}, {id: 2, ready: 1, title: "ready"}]
    },
    getUserStoryForTask: (taskId: number) => {
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
            ]
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
            ]
        } else {
            return [
                {
                    id: 3,
                    userId: 1,
                    projectId: 1,
                    userStory: 'frontend colors shames',
                    status: 0,
                    businessValue: null
                }
            ]
        }

    },
    getProjectParticipants: async (projectId: number) => {
        if (projectId === 1) {
            return [{
                id: 1, firstName: 'JhonLine',
                lastName: 'Szilvester', password: '432x',
                email: 'JS@gmail.com', address: null
            }
            ]
        }
        if (projectId === 2) {
            return [{
                id: 2, firstName: 'Jone',
                lastName: 'Wick', password: '4321',
                email: 'JW@gmail.com', address: null
            }
            ]
        } else {
            return []
        }
    },

    getUserInvites: async (userId: number) => {
        if (userId === 1) {
            return [
                {
                    id: 2, sander: 2,
                    receiver: 1, project: 2
                }
            ]
        } else {
            return []
        }
    },

    getProjectForInvite: async (inviteId: number) => {
        if (inviteId === 1) {
            return {
                id: 1,
                companyId: 1,
                ownerId: 1,
                name: 'New cash machine system'
            }
        }
        if (inviteId === 2) {
            return {
                id: 2,
                companyId: 1,
                ownerId: 1,
                name: 'New test project'
            }
        } if (inviteId===undefined) {
            throw new TypeError("Invitation doesn't exist")
        }
    },

    sendInvite: async (senderId: number, projectId: number, receiverId: number) => {
        return "invitation sent"
    },

    findInvitation: async (invitationId: number) => {
        if (invitationId === 1) {
            return {
                id: 1, sander: 2,
                receiver: 1, project: 1
            }
        }
        if (invitationId === 2) {
            return {
                id: 2, sander: 2,
                receiver: 1, project: 2
            }
        } else
            return {};
    },

    findReceiverForInvite: async (invite: ParticipateInvite) => {
        return {
            id: 1, firstName: 'JhonLine',
            lastName: 'Szilvester', password: '432x',
            email: 'JS@gmail.com', address: null
        }

    },

    acceptAndDeleteInvitation: async (project: Project, receiverId: number, invitationId: number) => {
        return true;
    },

    deleteInvite: async (inviteId: number) => {
        return true;
    }

}