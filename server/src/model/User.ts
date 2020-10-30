import Company from "./Company";
import path from "path";
import {Model} from "objection";
import Project from "./Project";
import UserStory from "./UserStory";

export default class User extends Model {

    static  tableName = 'users';

    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!:string;
    companies?:Company[];
    projects?:Project[];
    userStories?:UserStory[];
    participate?:Project[];
    userStoryEstimations?:UserStory[];

    static  idColumn =  "id";

    getName =()=>{
        return this.firstName +" "+this.lastName
    };

    static jsonSchema = {
        type: 'Object',
        required:['firstName','lastName'],

        properties:{
            id: { type: 'integer' },
            firstName: { type: 'string', minLength: 1, maxLength: 255 },
            lastName: { type: 'string', minLength: 1, maxLength: 255 },
            email: { type: 'string' },
            password:{type:'string'}
        },

        address: {
            type: 'object',
            properties: {
                street: { type: 'string' },
                city: { type: 'string' },
                zipCode: { type: 'string' }
            }
        }
    };

    static get relationMappings() {
        return {
            companies: {
                relation: Model.ManyToManyRelation,
                modelClass: Company,
                join: {
                    from: 'users.id',
                    // ManyToMany relation needs the `through` object to describe the join table.
                    through: {
                        from: 'users_company.userId',
                        to: 'users_company.companyId'
                    },
                    to: 'companies.id'
                }
            },
            projects:{
                relation: Model.HasManyRelation,
                modelClass: Project,
                join: {
                    from: 'users.id',
                    to: 'projects.ownerId'
                }
            },
            participate:{
                relation: Model.ManyToManyRelation,
                modelClass:Project,
                join:{
                    from:'users.id',
                    through:{
                        from:'user_projects.userId',
                        to:'user_projects.projectId'
                    },
                    to:'projects.id'
                }
            },
            userStories:{
                relation:Model.HasManyRelation,
                modelClass:UserStory,
                join:{
                    from:'users.id',
                    to:'user_stories.userId'
                }
            },
            userStoryEstimations:{
                relation: Model.ManyToManyRelation,
                modelClass: UserStory,
                join: {
                    from: 'users.id',
                    through:{
                        from:'user_estimations.userId',
                        to:'user_estimations.user_storyId',
                        extra:['estimation']
                    },
                    to:'user_stories.id'
                }
            }

        }
    }


};
