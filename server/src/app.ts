import {GraphQLServer} from "graphql-yoga";
import knexConfig from "../knexfile"
import User from "./model/User";
import {Model} from "objection";
import {Resolvers} from "./resolvers/resolver";

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
        await User.query().insertGraph(
            {firstName: "JhonLine", lastName: "Sylvester", email: "SJ@gmail.com", password: "1234"}
        );
        await User.query().insertGraph(
            {firstName: "Jone", lastName: "Wick", email: "JW@gmail.com", password: "4321"}
        );
        await User.relatedQuery('companies')
            .for(1)
            .insert({name: 'Morgen Stanly'});
        await User.relatedQuery('companies')
            .for(2)
            .insert({name: 'JP morgen'});
    }
}


server.start({port: 4001,endpoint:"/gql"}, () => {
    console.log('Server is running on http://localhost:4000/gql')
    insertBaseUsersToDb()
});