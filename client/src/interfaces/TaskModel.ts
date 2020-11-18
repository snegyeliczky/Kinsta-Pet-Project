import {UserModel} from "./UserModel";

export type TaskModel = {
    id: string,
    userStoryId: number,
    title: string,
    description: string,
    time?: string|null,
    ownerId?: string|null,
    owner?:UserModel|null,
    ready:boolean
}