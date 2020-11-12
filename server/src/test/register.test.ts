import {startServer} from "../app";
import request from "graphql-request/dist";
import User from "../model/User";

function sum(a: number, b: number) {
    return a + b;
}

const getUserOne = `
    query{
    user(id:1){
    id,firstName}
    }
    `

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test("Get user 1 from db", async () => {
    const response = await request('http://localhost:4001/gql',getUserOne);
    console.log(response);
    expect(response.user.id).toEqual(1)

});