"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const User_1 = __importDefault(require("./User"));
const Project_1 = __importDefault(require("./Project"));
class Company extends objection_1.Model {
    static get relationMappings() {
        return {
            users: {
                relation: objection_1.Model.ManyToManyRelation,
                modelClass: User_1.default,
                join: {
                    from: 'companies.id',
                    // ManyToMany relation needs the `through` object to describe the join table.
                    through: {
                        from: 'users_company.companyId',
                        to: 'users_company.userId'
                    },
                    to: 'users.id'
                }
            },
            projects: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: Project_1.default,
                join: {
                    from: 'companies.id',
                    to: 'projects.companyId'
                }
            },
            ownerUser: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: User_1.default,
                join: {
                    from: 'companies.owner',
                    to: ' users.id'
                }
            }
        };
    }
}
exports.default = Company;
Company.tableName = "companies";
Company.idColumn = "id";
Company.jsonSchema = {
    type: 'Object',
    required: ['name'],
    properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
    },
};
