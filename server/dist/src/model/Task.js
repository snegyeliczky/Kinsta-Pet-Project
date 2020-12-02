"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const UserStory_1 = __importDefault(require("./UserStory"));
const User_1 = __importDefault(require("./User"));
class Task extends objection_1.Model {
    static get relationMappings() {
        return {
            userStory: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: UserStory_1.default,
                join: {
                    from: 'tasks.user_story_id',
                    to: 'user_stories.id'
                }
            },
            owner: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: User_1.default,
                join: {
                    from: 'tasks.owner_id',
                    to: 'users.id'
                }
            }
        };
    }
}
exports.default = Task;
Task.tableName = 'tasks';
