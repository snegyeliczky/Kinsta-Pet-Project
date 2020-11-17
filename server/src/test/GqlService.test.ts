import {GqlService} from "../services/GqlService";

jest.mock('../services/MySqlService');

test("send Invite to User", async () => {
    let inviteMessage = await GqlService.sendProjectParticipationInvite(1, 2, 1);
    console.log(inviteMessage)
    expect(inviteMessage).toEqual("invitation sent")
});