import {UserModel} from "./UserModel";

export interface Company {
    id: number;
    name: string;
    users:UserModel[];
}