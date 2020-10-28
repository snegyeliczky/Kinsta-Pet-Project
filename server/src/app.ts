import express, { Application, Request, Response, NextFunction} from "express";
import knexConfig from "../knexfile"
import User from "./model/User";
const mysql = require('mysql');
const { Model } = require('objection');

const app:Application = express();

let knex = require('knex')(knexConfig.production);
Model.knex(knex);


async function insertBaseUsersToDb(){

    let users = await User.query();
    if (users.length<1){
        await User.query().insertGraph(
            {firstName: "JhonLine",lastName:"Sylvester",email:"SJ@gmail.com", password:"1234"}
        );
        await User.query().insertGraph(
            {firstName: "Jone",lastName:"Wick",email:"JW@gmail.com", password:"4321"}
        );
    }
    const Jones = await User.query()
        .where('firstName', 'Jone');

    console.log(Jones[0].getName());
    console.log('Wicks:', Jones);
}


app.get('/', (req:Request,res:Response, next:NextFunction)=>{
    res.send("Hello Sándi")
});


app.listen(3001, ()=>{
    console.log("Server running on port 3001... ");
    insertBaseUsersToDb();
});
