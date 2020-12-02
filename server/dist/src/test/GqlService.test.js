"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const GqlService_1 = require("../services/GqlService");
jest.mock('../services/MySqlService');
test("send Invite to User", () => __awaiter(void 0, void 0, void 0, function* () {
    let inviteMessage = yield GqlService_1.GqlService.sendProjectParticipationInvite(1, 2, 1);
    expect(inviteMessage).toEqual("invitation sent");
}));
test("user Participate in project", () => __awaiter(void 0, void 0, void 0, function* () {
    let inviteMessage = yield GqlService_1.GqlService.sendProjectParticipationInvite(1, 1, 1);
    expect(inviteMessage).toEqual("user all ready participate in the project");
}));
test("user have invitation for the project", () => __awaiter(void 0, void 0, void 0, function* () {
    let inviteMessage = yield GqlService_1.GqlService.sendProjectParticipationInvite(1, 1, 2);
    expect(inviteMessage).toEqual("user have invitation to this project");
}));
test("Unable to accept User already participate ", () => __awaiter(void 0, void 0, void 0, function* () {
    let acceptMessage = yield GqlService_1.GqlService.acceptParticipationInvitation(1);
    expect(acceptMessage).toEqual("User participating in project");
}));
test("invite accepted", () => __awaiter(void 0, void 0, void 0, function* () {
    let acceptMessage = yield GqlService_1.GqlService.acceptParticipationInvitation(2);
    expect(acceptMessage).toEqual("invite accepted");
}));
test("Invite is not exist", () => __awaiter(void 0, void 0, void 0, function* () {
    let acceptMessage = yield GqlService_1.GqlService.acceptParticipationInvitation(3);
    expect(acceptMessage).toEqual("Invitation is invalid! Refresh The Page!");
}));
