"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const User_1 = __importDefault(require("./User"));
const UserStory_1 = __importDefault(require("./UserStory"));
class UserEstimation extends objection_1.Model {
    static get relationMappings() {
        return {
            owner: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: User_1.default,
                join: {
                    from: 'user_estimations.userId',
                    to: 'users.id'
                }
            },
            userStory: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: UserStory_1.default,
                join: {
                    from: 'user_estimations.user_storyId',
                    to: 'user_stories.id'
                }
            }
        };
    }
}
exports.default = UserEstimation;
UserEstimation.tableName = 'user_estimations';
