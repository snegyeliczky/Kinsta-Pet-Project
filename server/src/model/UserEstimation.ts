import {Model} from "objection";

export default class UserEstimation extends Model{

    static tableName = 'user_estimations'

    id!:number;
    userId!:number;
    user_storyId!:number;
    estimation!:number;
}