import User from "../../model/User";

export const user ={
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
}