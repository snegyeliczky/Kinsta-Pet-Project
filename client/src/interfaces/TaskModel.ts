export type TaskModel = {
    id: string,
    userStoryId: number,
    title: string,
    description: string,
    time?: string|null,
    ownerId?: string|null,
    ready:boolean
}