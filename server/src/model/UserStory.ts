import {Model} from "objection";
import Project from "./Project";
import User from "./User";
import Task from "./Task";
import UserEstimation from "./UserEstimation";

export default class UserStory extends Model {

    id!: number;
    project!: Project;
    userStory!: string;
    status!: boolean;
    businessValue?: number;
    owner?: User;
    estimatedUsers?: UserEstimation[];
    tasks?: Task[];

    static tableName = 'user_stories';

    static get relationMappings() {
        return {
            project: {
                relation: Model.BelongsToOneRelation,
                modelClass: Project,
                join: {
                    from: 'user_stories.projectId',
                    to: 'projects.id'
                }
            },
            owner: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'user_stories.userId',
                    to: 'users.id'
                }
            },
            estimatedUsers: {
                relation: Model.HasManyRelation,
                modelClass: UserEstimation,
                join: {
                    from: 'user_stories.id',
                    to: 'user_estimations.user_storyId',
                }
            },
            tasks: {
                relation: Model.HasManyRelation,
                modelClass: Task,
                join: {
                    from: 'user_stories.id',
                    to: 'tasks.user_story_id'
                }
            }
        }
    }


}