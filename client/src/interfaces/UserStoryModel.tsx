export interface UserStoryModel {
    id:number,
    projectId:number,
    userStory:string,
    businessValue:number,
    estimation:number,
    ownerId:string|null,
    status:boolean
    estimatedUsers:{[key:string]:number}
}