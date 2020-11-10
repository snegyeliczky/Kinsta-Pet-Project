import {Model} from "objection";
import User from "./User";
import Project from "./Project";

export default class ParticipateInvite extends Model {

    static tableName = 'participate_invites';

    id!: number;
    sander!: User;
    receiver!: User;
    project!: Project;

    static get relationMappings() {
        return {
            sander: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'participate_invites.sanderId',
                    to: 'users.id'
                }
            },
            receiver: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'participate_invites.receiverId',
                    to: 'users.id'
                }
            },
            project: {
                relation: Model.BelongsToOneRelation,
                modelClass: Project,
                join: {
                    from: 'participate_invites.projectId',
                    to: 'projects.id'
                }
            }
        }
    }

}