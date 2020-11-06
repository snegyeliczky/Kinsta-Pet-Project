import {Model} from "objection";
import User from "./User";
import UserStory from "./UserStory";

export default class UserEstimation extends Model{

    static tableName = 'user_estimations'

    id!:number;
    estimation!:number;
    owner!:User;
    userStory!:UserStory;

    static get relationMappings(){
        return{
            owner:{
                relation:Model.BelongsToOneRelation,
                modelClass:User,
                join:{
                    from:'user_estimations.userId',
                    to:'users.id'
                }
            },
            userStory:{
                relation: Model.BelongsToOneRelation,
                modelClass: UserStory,
                join:{
                    from:'user_estimations.user_storyId',
                    to:'user_stories.id'
                }
            }
        }
    }

}