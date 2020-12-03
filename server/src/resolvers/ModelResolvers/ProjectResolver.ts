import Project from "../../model/Project";

export const project = {
    id: (parent: Project) => parent.id,
    company: async (parent: Project) => {
        let companyInList = await Project.relatedQuery("company").for(parent.id);
        return companyInList[0];
    },
    name: (parent: Project) => parent.name,
    owner: async (parent: Project) => {
        let ownerInList = await Project.relatedQuery("owner").for(parent.id);
        return ownerInList[0];
    },
    participants: (parent: Project) => {
        return Project.relatedQuery("participants").for(parent.id);
    },
    userStories: (parent: Project) => {
        return Project.relatedQuery("userStories").for(parent.id);
    },
}