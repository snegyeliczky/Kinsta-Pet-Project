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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbInit = void 0;
const User_1 = __importDefault(require("../model/User"));
const Company_1 = __importDefault(require("../model/Company"));
const Project_1 = __importDefault(require("../model/Project"));
const UserStory_1 = __importDefault(require("../model/UserStory"));
const Task_1 = __importDefault(require("../model/Task"));
const GqlService_1 = require("../services/GqlService");
function DbInit() {
    return __awaiter(this, void 0, void 0, function* () {
        yield GqlService_1.GqlService.registerUser("Sándi", "Negyeliczky", "sandor.negyeliczky@gmail.com", "1234");
        yield GqlService_1.GqlService.registerUser("Jone", "Wick", "JW@gmail.com", "4321");
        yield User_1.default.relatedQuery('companies')
            .for(1)
            .insert({ name: 'Morgen Stanly' });
        yield User_1.default.relatedQuery('ownedCompanies')
            .for(1).relate(1);
        yield User_1.default.relatedQuery('companies')
            .for(1)
            .insert({ name: 'JP morgen' });
        yield User_1.default.relatedQuery('ownedCompanies')
            .for(1).relate(2);
        yield User_1.default.relatedQuery('companies')
            .for(2)
            .relate(2);
        yield Company_1.default.relatedQuery('projects')
            .for(1).insert({ name: 'New cash machine system' });
        yield Company_1.default.relatedQuery('projects')
            .for(1).insert({ name: 'Recuiter system for HR' });
        yield User_1.default.relatedQuery('projects').for(1).relate([1, 2]);
        yield User_1.default.relatedQuery('participate').for(2).relate(1);
        yield User_1.default.relatedQuery('participate').for(1).relate(2);
        yield User_1.default.relatedQuery('participate').for(2).relate(2);
        yield Project_1.default.relatedQuery('userStories').for(1)
            .insert({ userStory: "frontend colors shames", status: false });
        yield Project_1.default.relatedQuery('userStories').for(1)
            .insert({ userStory: "backend db connection", status: false });
        yield Project_1.default.relatedQuery('userStories').for(2)
            .insert({ userStory: "MySql db backend", status: false });
        yield User_1.default.relatedQuery('userStories').for(1)
            .relate(1);
        yield User_1.default.relatedQuery('userStories').for(2)
            .relate(2);
        let estimation = yield User_1.default.relatedQuery('userStoryEstimations').for(1).insert({ estimation: 1 });
        yield estimation.$relatedQuery('userStory').relate(1);
        let estimation2 = yield User_1.default.relatedQuery('userStoryEstimations').for(2).insert({ estimation: 2 });
        yield estimation2.$relatedQuery('userStory').relate(1);
        yield UserStory_1.default.relatedQuery('tasks').for(1)
            .insert({ title: "creat security", description: "hash password", ready: false });
        yield UserStory_1.default.relatedQuery('tasks').for(1)
            .insert({ title: "creat user model", description: "user have name ", ready: false });
        yield Task_1.default.relatedQuery('owner').for(1).relate(1);
        yield Task_1.default.relatedQuery('owner').for(2).relate(2);
    });
}
exports.DbInit = DbInit;
