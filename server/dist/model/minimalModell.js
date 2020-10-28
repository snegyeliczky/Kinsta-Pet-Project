"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Model } = require('objection');
class Persons extends Model {
    constructor() {
        super(...arguments);
        this.getName = () => {
            return this.firstName + " " + this.lastName;
        };
    }
}
exports.default = Persons;
Persons.tableName = "persons";
Persons.idColumn = "id";
Persons.jsonSchema = {};
;
