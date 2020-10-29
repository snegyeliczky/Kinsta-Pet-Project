import {GraphQLServer} from "graphql-yoga";
import knexConfig from "../knexfile"
import User from "./model/User";
import {Model} from "objection";
import {Resolvers} from "./resolvers/resolver";
import Project from "./model/Project";
import {DbInit} from "./util/initialiser";

const resolvers = {
    ...Resolvers
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
});

let knex = require('knex')(knexConfig.production);
Model.knex(knex);

async function insertBaseUsersToDb() {
    let users = await User.query();
    if (users.length < 1) {
       await DbInit();
    }
    let testData = await  Project.relatedQuery('participants').for(2);
    console.log(testData);
}


server.start({port: 4001,endpoint:"/gql"}, () => {
    console.log('Server is running on http://localhost:4001/gql');
    insertBaseUsersToDb();
});