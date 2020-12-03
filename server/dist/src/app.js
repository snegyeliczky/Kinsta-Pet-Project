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
exports.startServer = void 0;
const graphql_yoga_1 = require("graphql-yoga");
const knexfile_1 = __importDefault(require("../knexfile"));
const User_1 = __importDefault(require("./model/User"));
const objection_1 = require("objection");
const resolver_1 = require("./resolvers/resolver");
const initialiser_1 = require("./util/initialiser");
const GqlService_1 = require("./services/GqlService");
function insertBaseUsersToDb() {
    return __awaiter(this, void 0, void 0, function* () {
        let users = yield User_1.default.query();
        if (users.length < 1) {
            yield initialiser_1.DbInit();
        }
        let testData = yield GqlService_1.GqlService.loginUser("sandor.negyeliczky@gmail.com", "1234");
        console.log(testData);
    });
}
;
const pubsub = new graphql_yoga_1.PubSub();
exports.startServer = () => {
    const server = new graphql_yoga_1.GraphQLServer({
        typeDefs: './src/schema.graphql',
        resolvers: resolver_1.resolvers,
        context: ({ request, response }) => ({ request, response, pubsub })
    });
    let knex = require('knex')(knexfile_1.default.production);
    objection_1.Model.knex(knex);
    server.start({ port: 4001, endpoint: "/gql" }, () => {
        console.log('Server is running on http://localhost:4001/gql');
        insertBaseUsersToDb();
    });
};
exports.startServer();
