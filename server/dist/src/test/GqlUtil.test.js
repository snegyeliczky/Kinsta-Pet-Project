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
const GqlUtil_1 = require("../util/GqlUtil");
jest.mock('../services/MySqlService');
test("task distribution 3 finished, with mocked MySqlService for GqlUtil", () => __awaiter(void 0, void 0, void 0, function* () {
    let taskDist = yield GqlUtil_1.GqlUtil.geTasksDistributionForProject(1);
    expect(taskDist.finishedTasks).toEqual(3);
}));
test(" unFinished Tasks id is 1 For User,  with mocked db", () => __awaiter(void 0, void 0, void 0, function* () {
    let unFinishedTasks = yield GqlUtil_1.GqlUtil.unFinishedTasksForUser(1);
    expect(unFinishedTasks[0].id).toEqual(1);
}));
test("user story status check 2 finished return true", () => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield GqlUtil_1.GqlUtil.checkUserStoryStatus(1);
    expect(data.status).toEqual(true);
}));
test("user story status check 1 finish 1 not return false", () => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield GqlUtil_1.GqlUtil.checkUserStoryStatus(3);
    expect(data.status).toEqual(false);
}));
test("user story status 2 not finished return false", () => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield GqlUtil_1.GqlUtil.checkUserStoryStatus(5);
    expect(data.status).toEqual(false);
}));
