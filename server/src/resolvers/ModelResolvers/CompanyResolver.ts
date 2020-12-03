import Company from "../../model/Company";

export const company = {
    id: (parent: Company) => parent.id,
    name: (parent: Company) => parent.name,
    ownerUser: async (parent: Company) => {
        let userInList = await Company.relatedQuery("ownerUser").for(parent.id);
        return userInList[0]
    },
    users: (parent: Company) => {
        return Company.relatedQuery("users").for(parent.id);
    },
    projects: (parent: Company) => {
        return Company.relatedQuery("projects").for(parent.id);
    },
}