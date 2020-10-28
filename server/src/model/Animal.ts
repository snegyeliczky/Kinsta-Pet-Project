import { Model } from 'objection'
import User from './User'

export default class Animal extends Model {
    id!: number;
    name!: string;
    species!:string;
    owner?: User;

    // Table name is the only required property.
    static tableName = 'animals';
    static  idColumn =  "id";

    // Optional JSON schema. This is not the database schema! Nothing is generated
    // based on this. This is only used for validation. Whenever a model instance
    // is created it is checked against this schema. http://json-schema.org/.

}
