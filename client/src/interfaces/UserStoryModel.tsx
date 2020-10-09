export interface UserStoryModel {
    id:number,
    projectId:number,
    userStory:string,
    businessValue:number,
    estimation:number,
    ownerId:number|null,
    status:boolean
}