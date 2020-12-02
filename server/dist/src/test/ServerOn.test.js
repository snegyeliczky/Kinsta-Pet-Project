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
const dist_1 = __importDefault(require("graphql-request/dist"));
const User_1 = __importDefault(require("../model/User"));
const knexfile_1 = __importDefault(require("../../knexfile"));
const objection_1 = require("objection");
const getUserOne = `
    query{
    user(id:1){
    id,firstName}
    }
    `;
test("GQL test | Get user 1 with GQL", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield dist_1.default('http://localhost:4001/gql', getUserOne);
    expect(response.user.id).toEqual(1);
}));
test("DB test | Get user 1 from db directly ", () => __awaiter(void 0, void 0, void 0, function* () {
    let knex = require('knex')(knexfile_1.default.production);
    yield objection_1.Model.knex(knex);
    let user1 = yield User_1.default.query().findById(1);
    expect(user1.id).toEqual(1);
    yield knex.destroy();
}));
