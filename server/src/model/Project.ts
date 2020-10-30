import {Model} from "objection";
import Company from "./Company";
import User from "./User";
import UserStory from "./UserStory";

export default class Project extends Model{

    static tableName = 'projects';

    id!:number;
    company!:Company;
    name!:string;
    owner!:User;
    participants?:User[];
    userStories?:Project[];

    static get relationMappings(){
        return{
            company:{
                relation:Model.BelongsToOneRelation,
                modelClass:Company,
                join:{
                    from:'projects.companyId',
                    to:'companies.id'
                }
            },
            owner:{
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from:'projects.ownerId',
                    to:'users.id'
                }
            },
            participants:{
                relation: Model.ManyToManyRelation,
                modelClass:User,
                join:{
                    from:'projects.id',
                    through:{
                        from:'user_projects.projectId',
                        to:'user_projects.userId'
                    },
                    to:'users.id'
                }
            },
            userStories:{
                relation:Model.HasManyRelation,
                modelClass:UserStory,
                join:{
                    from:'projects.id',
                    to:'user_stories.projectId'
                }
            }
        }
    }
}