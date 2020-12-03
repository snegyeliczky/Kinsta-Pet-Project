import ParticipateInvite from "../../model/ParticipateInvite";

export const participateInvite ={
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
}