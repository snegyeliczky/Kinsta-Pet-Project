import {GraphQLServer} from "graphql-yoga";
import knexConfig from "../knexfile"
import User from "./model/User";
import {Model} from "objection";
import {resolvers} from "./resolvers/resolver";
import {DbInit} from "./util/initialiser";
import Task from "./model/Task";
import UserStory from "./model/UserStory";
import {GqlService} from "./services/GqlService";
import Project from "./model/Project";
import {GqlUtil} from "./util/GqlUtil";


const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
});

let knex = require('knex')(knexConfig.production);
Model.knex(knex);

async function insertBaseUsersToDb() {
    let users = await User.query();
    if (users.length < 1) {
        await DbInit();
    }
    let testData = await Task.query()
    console.log(testData);
}


server.start({port: 4001, endpoint: "/gql"}, () => {
    console.log('Server is running on http://localhost:4001/gql');
    insertBaseUsersToDb();
});