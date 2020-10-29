import User from "../model/User";
import Company from "../model/Company";

export const Resolvers = {
    Query : {
        users: ()=>User.query(),
        user: (parent:User,args:{id:number}) =>{return User.query().findById(args.id)},

        companies: () => Company.query(),
        company: (parent:Company,args:{id:number}) =>{return Company.query().findById(args.id)}
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
        }
    }

};