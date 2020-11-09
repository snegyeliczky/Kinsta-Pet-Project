import {Model} from "objection";
import User from "./User";
import Project from "./Project";

export default class ParticipateInvite extends Model{

    static tableName = 'participate_invites';

    id!:number;
    sander!:User;
    getter!:User;
    project!:Project;

    static get relationMappings (){
        return{

        }
    }

}