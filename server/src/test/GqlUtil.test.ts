import {GqlUtil} from "../util/GqlUtil";
jest.mock('../services/MySqlService');

test("task distribution 2 finished, with mocked MySqlService for GqlUtil",  async () =>{
    let taskDist =  await GqlUtil.geTasksDistributionForProject(1);
    expect(taskDist.finishedTasks).toEqual(4)
});

test(" unFinished Tasks id is 1 For User,  with mocked db", async () =>{
    let unFinishedTasks = await GqlUtil.unFinishedTasksForUser(1);
    expect(unFinishedTasks[0].id).toEqual(1)
});

test("user story status check return false", async () =>{
    let data = await GqlUtil.checkUserStoryStatus(1);
    expect(data.status).toEqual(true);
})