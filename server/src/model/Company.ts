import {Model} from "objection";
import User from "./User";

export default class Company extends Model {

    static tableName = "companies";

    id!: number;
    name!: string;
    employees?: User[];

    static idColumn = "id";

    static jsonSchema = {
        type: 'Object',
        required: ['name'],

        properties: {
            id: {type: 'integer'},
            name: {type: 'string', minLength: 1, maxLength: 255},
        },
    };

    static get relationMappings (){
        const User = require('./User');

        return {
            employees: {

                relation: Model.ManyToManyRelation,

                modelClass: User,

                join: {
                    from: 'companies.id',

                    // ManyToMany relation needs the `through` object to describe the join table.
                    through: {
                        from: 'users_company.companyId',
                        to: 'users_company.userId'
                    },

                    to: 'users.id'
                }
            }
        }
    }
}