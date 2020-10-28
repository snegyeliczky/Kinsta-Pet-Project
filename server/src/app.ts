import express, { Application, Request, Response, NextFunction} from "express";
import knexConfig from "../knexfile"
import User from "./model/User";
import Company from "./model/Company";
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
        await User.relatedQuery('companies')
            .for(2)
            .insert({name:'Morgen Stanly'});
    }

    const Jone = await User.query().findById(1);
    const stanly = await Company.query().findById(1);

   let usersCompany = await User.relatedQuery('companies').for(1);
   let companyUsers = await Company.relatedQuery('users').for(1);

   console.log(companyUsers);
}


app.get('/', (req:Request,res:Response, next:NextFunction)=>{
    res.send("Hello Sándi")
});


app.listen(3001, ()=>{
    console.log("Server running on port 3001... ");
    insertBaseUsersToDb();
});
