export type TaskModel = {
    id: string,
    userStoryId: number,
    title: string,
    description: string,
    priority: number,
    ownerId?: number|null
}