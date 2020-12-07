import {UserModel} from "./UserModel";

export interface Company {
    id: number;
    name: string;
    ownerUser:UserModel;
    users:UserModel[];
}