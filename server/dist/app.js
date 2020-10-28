"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql = require('mysql');
const { Model } = require('objection');
const Knex = require('knex');
const app = express_1.default();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '339150sa',
    database: "nodemysql"
});
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySql Connected...");
});
const knex = Knex({
    client: 'mysql',
    useNullAsDefault: true,
    connection: db
});
Model.knex(knex);
app.get('/', (req, res, next) => {
    res.send("Hello Sándi");
});
app.listen(3001, () => {
    console.log("started");
});
