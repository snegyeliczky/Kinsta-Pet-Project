import {UserModel} from "./UserModel";

export type TaskModel = {
    id: string,
    userStory:{id:number},
    title: string,
    description: string,
    time?: string|null,
    owner?:UserModel|null,
    ready:boolean
}