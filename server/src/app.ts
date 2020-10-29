import {GraphQLServer} from "graphql-yoga";
import knexConfig from "../knexfile"
import User from "./model/User";
import Company from "./model/Company";
import {Model} from "objection";
import {Resolvers} from "./resolvers/userResolver";

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
            .for(2)
            .insert({name: 'Morgen Stanly'});
    }

    const Jone = await User.query().findById(1);
    const stanly = await Company.query().findById(1);

    let usersCompany = await User.relatedQuery('companies').for(1);
    let companyUsers = await Company.relatedQuery('users').for(1);

    console.log("company users :", companyUsers);
}

server.start({port: 4001}, () => {
    console.log('Server is running on http://localhost:4000')
    insertBaseUsersToDb()
});