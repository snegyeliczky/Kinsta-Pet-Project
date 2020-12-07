import {UserModel} from "./UserModel";
import {Company} from "./Company";

export interface Project {
    id:number,
    company:Company,
    name:string,
    owner?:UserModel
    participants:UserModel[]
}