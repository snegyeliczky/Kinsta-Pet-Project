import {GqlUtil} from "../util/GqlUtil";
jest.mock('../services/MySqlService');

test("task distribution 2 finished, with mocked MySqlService for GqlUtil",  async () =>{
    let invite =  await GqlUtil.geTasksDistributionForProject(1);
    expect(invite.finishedTasks).toEqual(2)
});

test(" unFinished Tasks id is 1 For User,  with mocked db", async () =>{
    let unFinishedTasks = await GqlUtil.unFinishedTasksForUser(1);
    expect(unFinishedTasks[0].id).toEqual(1)
});