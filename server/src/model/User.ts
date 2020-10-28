import Animal from "./Animal";
import Company from "./Company";

const { Model } = require('objection');

export default class User extends Model {

    static  tableName = 'users';

    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!:string;
    pets?: Animal[];
    companies?:Company[];


    static  idColumn =  "id";


    getName =()=>{
        return this.firstName +" "+this.lastName
    };

    static jsonSchema = {
        type: 'Object',
        required:['firstName','lastName'],

        properties:{
            id: { type: 'integer' },
            firstName: { type: 'string', minLength: 1, maxLength: 255 },
            lastName: { type: 'string', minLength: 1, maxLength: 255 },
            email: { type: 'string' },
            password:{type:'string'}

        },

        address: {
            type: 'object',
            properties: {
                street: { type: 'string' },
                city: { type: 'string' },
                zipCode: { type: 'string' }
            }
        }
    };

    static get relationMappings() {
        return {
            pets: {
                relation: Model.HasManyRelation,
                // The related model. This can be either a Model subclass constructor or an
                // absolute file path to a module that exports one.
                modelClass: Animal,
                join: {
                    from: 'users.id',
                    to: 'animals.ownerId'
                }
            },

            companies: {
                relation: Model.ManyToManyRelation,
                modelClass: Company,
                join: {
                    from: 'users.id',
                    // ManyToMany relation needs the `through` object to describe the join table.
                    through: {
                        from: 'users_company.userId',
                        to: 'users_company.companyId'
                    },
                    to: 'companies.id'
                }
            }
        }
    }


};
