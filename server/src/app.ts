import {GraphQLServer} from "graphql-yoga";
import knexConfig from "../knexfile"
import User from "./model/User";
import {Model} from "objection";
import {resolvers} from "./resolvers/resolver";
import {DbInit} from "./util/initialiser";
import {GqlUtil} from "./util/GqlUtil";
import {GqlService} from "./services/GqlService";
import Company from "./model/Company";


async function insertBaseUsersToDb() {
    let users = await User.query();
    if (users.length < 1) {
        await DbInit();
    }
    let testData = await Company.relatedQuery("ownerUser").for(3);
    console.log(testData);

};

export const startServer = () => {
    const server = new GraphQLServer({
        typeDefs: './src/schema.graphql',
        resolvers
    });

    let knex = require('knex')(knexConfig.production);
    Model.knex(knex);
    server.start({port: 4001, endpoint: "/gql"}, () => {
        console.log('Server is running on http://localhost:4001/gql');
        insertBaseUsersToDb();
    });
};

startServer();
