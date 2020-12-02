"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const Project_1 = __importDefault(require("./Project"));
const User_1 = __importDefault(require("./User"));
const Task_1 = __importDefault(require("./Task"));
const UserEstimation_1 = __importDefault(require("./UserEstimation"));
class UserStory extends objection_1.Model {
    static get relationMappings() {
        return {
            project: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: Project_1.default,
                join: {
                    from: 'user_stories.projectId',
                    to: 'projects.id'
                }
            },
            owner: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: User_1.default,
                join: {
                    from: 'user_stories.userId',
                    to: 'users.id'
                }
            },
            estimatedUsers: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: UserEstimation_1.default,
                join: {
                    from: 'user_stories.id',
                    to: 'user_estimations.user_storyId',
                }
            },
            tasks: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: Task_1.default,
                join: {
                    from: 'user_stories.id',
                    to: 'tasks.user_story_id'
                }
            }
        };
    }
}
exports.default = UserStory;
UserStory.tableName = 'user_stories';
