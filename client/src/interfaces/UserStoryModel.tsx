import {UserEstimation} from "./UserEstimation";
import {UserModel} from "./UserModel";
import {Project} from "./Project";

export interface UserStoryModel {
    id:number,
    userStory:string,
    businessValue:number,
    status:boolean,
    estimatedUsers:UserEstimation[]|null,
    owner:UserModel,
    project:Project,
}