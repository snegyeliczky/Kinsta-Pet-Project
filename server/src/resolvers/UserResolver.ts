import User from "../model/User";

export const Resolvers = {
   Query : {
        users: ()=>User.query(),
        user: (parent:User,args:{id:number}) =>{return User.query().findById(args.id)}
    },

    User:{
        id:(parent:User)=>parent.id,
        firstName:(parent:User)=>parent.firstName,
        lastName:(parent:User)=>parent.lastName,
        email:(parent:User)=>parent.email,
    }

};