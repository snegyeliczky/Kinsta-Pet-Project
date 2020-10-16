export type TaskModel = {
    id: string,
    userStoryId: number,
    title: string,
    description: string,
    time?: string|null,
    ownerId?: number|null,
    ready:boolean
}