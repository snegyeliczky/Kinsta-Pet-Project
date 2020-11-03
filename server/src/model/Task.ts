import {Model} from "objection";
import UserStory from "./UserStory";
import User from "./User";

export default class Task extends Model {

    static tableName = 'tasks';

    id!: string;
    title!: string;
    description!: string;
    ready!: boolean;
    time?: string | null;
    userStory!: UserStory;
    owner?: User;

    static get relationMappings() {
        return {
            userStory: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserStory,
                join: {
                    from: 'tasks.user_story_id',
                    to: 'user_stories.id'
                }
            },
            owner: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'tasks.owner_id',
                    to: 'users.id'
                }
            }
        }
    }
}