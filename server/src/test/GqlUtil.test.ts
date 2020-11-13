import {GqlUtil} from "../util/GqlUtil";
jest.mock('../services/MySqlService');

test("Mock test MySql",  async () =>{
    let invite =  await GqlUtil.geTasksDistributionForProject(1);
    expect(invite.finishedTasks).toEqual(2)
});