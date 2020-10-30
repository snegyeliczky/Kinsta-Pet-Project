import {GraphQLServer} from "graphql-yoga";
import knexConfig from "../knexfile"
import User from "./model/User";
import {Model} from "objection";
import {Resolvers} from "./resolvers/resolver";
import Project from "./model/Project";
import {DbInit} from "./util/initialiser";
import UserStory from "./model/UserStory";

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
    // @ts-ignore
    await User.relatedQuery('userStoryEstimations').for(1).patch({estimation:12}).where('user_storyId',1);
    let testData = await UserStory.relatedQuery('estimatedUsers').for(1);

    console.log(testData);
}


server.start({port: 4001,endpoint:"/gql"}, () => {
    console.log('Server is running on http://localhost:4001/gql');
    insertBaseUsersToDb();
});