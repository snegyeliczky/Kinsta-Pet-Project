import {GqlUtil} from "../util/GqlUtil";
jest.mock('../services/MySqlService');

test("task distribution 3 finished, with mocked MySqlService for GqlUtil",  async () =>{
    let taskDist =  await GqlUtil.geTasksDistributionForProject(1);
    expect(taskDist.finishedTasks).toEqual(3)
});

test(" unFinished Tasks id is 1 For User,  with mocked db", async () =>{
    let unFinishedTasks = await GqlUtil.unFinishedTasksForUser(1);
    expect(unFinishedTasks[0].id).toEqual(1)
});

test("user story status check 2 finished return true", async () =>{
    let data = await GqlUtil.checkUserStoryStatus(1);
    expect(data.status).toEqual(true);
});

test("user story status check 1 finish 1 not return false", async () =>{
    let data = await GqlUtil.checkUserStoryStatus(3);
    expect(data.status).toEqual(false);
});

test("user story status 2 not finished return false", async () =>{
    let data = await GqlUtil.checkUserStoryStatus(5);
    expect(data.status).toEqual(false);
});