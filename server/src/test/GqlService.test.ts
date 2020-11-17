import {GqlService} from "../services/GqlService";

jest.mock('../services/MySqlService');

test("send Invite to User", async () => {
    let inviteMessage = await GqlService.sendProjectParticipationInvite(1, 2, 1);
    expect(inviteMessage).toEqual("invitation sent")
});

test("user Participate in project", async () => {
    let inviteMessage = await GqlService.sendProjectParticipationInvite(1, 1, 1);
    expect(inviteMessage).toEqual("user all ready participate in the project")
});

test("user have invitation for the project", async () => {
    let inviteMessage = await GqlService.sendProjectParticipationInvite(1, 1, 2);
    expect(inviteMessage).toEqual("user have invitation to this project")
});

test("Unable to accept User already participate ", async () => {
    let acceptMessage = await GqlService.acceptParticipationInvitation(1);
    expect(acceptMessage).toEqual("User participating in project")
});

test("invite accepted", async () => {
    let acceptMessage = await GqlService.acceptParticipationInvitation(2);
    expect(acceptMessage).toEqual("invite accepted")
});

test("Invite is not exist", async () => {
    let acceptMessage = await GqlService.acceptParticipationInvitation(3);
    expect(acceptMessage).toEqual("Invitation is invalid! Refresh The Page!")
});
