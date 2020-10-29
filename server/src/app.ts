import {GraphQLServer} from "graphql-yoga";
import knexConfig from "../knexfile"
import User from "./model/User";
import {Model} from "objection";
import {Resolvers} from "./resolvers/resolver";
import Company from "./model/Company";
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
       await DbInit()
    }
    await User.relatedQuery('projects').for(1).relate([1,2]);
    let p = await User.relatedQuery('projects').for(1);
    let c = await  Project.relatedQuery('company').for(1);
    console.log(p)
}


server.start({port: 4001,endpoint:"/gql"}, () => {
    console.log('Server is running on http://localhost:4000/gql')
    insertBaseUsersToDb()
});