export const taskDistribution = {
    finishedTasks: (parent: { finishedTasks: number, allTasks: number }) => parent.finishedTasks,
    allTasks: (parent: { finishedTasks: number, allTasks: number }) => parent.allTasks
}