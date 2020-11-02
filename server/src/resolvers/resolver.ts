import User from "../model/User";
import Company from "../model/Company";
import Project from "../model/Project";

export const Resolvers = {
    Query : {
        users: ()=>User.query(),
        user: (parent:User,args:{id:number}) =>{return User.query().findById(args.id)},
        getCompaniesForUser:(parent:User,args:{userId:number})=>{
            return User.relatedQuery('companies').for(args.userId)},

        companies: () => Company.query(),
        company: (parent:Company,args:{id:number}) =>{return Company.query().findById(args.id)},
        getProjectsForCompany:(parent:Company,args:{companyId:number})=>{},

        projects: () =>  Project.query(),
        project:(parent:Project,args:{id:number})=>{ return Project.query().findById(args.id)},
    },

    Mutation:{
        addUser: (parent:User,args:{newFirstName:string, newLastName:string,email:string,password:string})=>{
               return  User.query().insert(
                {firstName: args.newFirstName, lastName: args.newLastName, email: args.email, password: args.password}
            )
        },
        addCompany:(parent:Company,args:{userId:number,CompanyName:string})=>{
            return  User.relatedQuery('companies')
                .for(args.userId)
                .insert({name: args.CompanyName});
        },
        addUserToCompany: async (parent:Company , args:{userId:number,companyId:number})=>{
           return  User.relatedQuery('companies').for(args.userId).relate(args.companyId);
        }
    },

    User:{
        id:(parent:User)=>parent.id,
        firstName:(parent:User)=>parent.firstName,
        lastName:(parent:User)=>parent.lastName,
        email:(parent:User)=>parent.email,
        companies:(parent:User) => {
            return  User.relatedQuery('companies').for(parent.id);
        }
    },

    Company:{
        id:(parent:Company)=>parent.id,
        name:(parent:Company)=>parent.name,
        users:(parent:Company)=>{
            return Company.relatedQuery('users').for(parent.id)
        },
        projects: (parent:Company)=>{
            return Company.relatedQuery('projects').for(parent.id);
        }
    },

    Project:{
        id:(parent:Project)=>parent.id,
        company:async (parent:Project)=>{
                let companyInList = await Project.relatedQuery('company').for(parent.id);
                return companyInList[0];
            },
        name:(parent:Project)=>parent.name,
        owner:async (parent:Project)=>{
            let ownerInList = await Project.relatedQuery('owner').for(parent.id);
            return ownerInList[0];
        },
        participants:(parent:Project)=>{return Project.relatedQuery('participants').for(parent.id)},
    }

};