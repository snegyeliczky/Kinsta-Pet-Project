import {GqlService} from "../services/GqlService";

jest.mock('../services/MySqlService');

test("send Invite to User", async () => {
    let inviteMessage = await GqlService.sendProjectParticipationInvite(1, 2, 1);
    expect(inviteMessage).toEqual("invitation sent")
});

test("user Participate in project", async ()=>{
    let inviteMessage = await GqlService.sendProjectParticipationInvite(1, 1, 1);
    expect(inviteMessage).toEqual("user all ready participate in the project")
})

test("user hav invitation for the project", async ()=>{
    let inviteMessage = await GqlService.sendProjectParticipationInvite(1, 1, 2);
    expect(inviteMessage).toEqual("user have invitation to this project")
})