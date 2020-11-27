import {UserModel} from "./UserModel";

export type UserEstimation = {
    id:number,
    owner:UserModel,
    estimation:number
}