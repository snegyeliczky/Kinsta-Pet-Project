import request from "graphql-request/dist";
import User from "../model/User";
import knexConfig from "../../knexfile";
import {Model} from "objection";


const getUserOne = `
    query{
    user(id:1){
    id,firstName}
    }
    `


test("GQL test | Get user 1 with GQL", async () => {
    const response = await request('http://localhost:4001/gql', getUserOne);
    expect(response.user.id).toEqual(1)
});

test("DB test | Get user 1 from db directly ", async () => {
    let knex = require('knex')(knexConfig.production);
    await Model.knex(knex);
    let user1 = await User.query().findById(1);
    expect(user1.id).toEqual(1);
    await knex.destroy()
});

