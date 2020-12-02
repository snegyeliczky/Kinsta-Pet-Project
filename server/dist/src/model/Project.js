"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const Company_1 = __importDefault(require("./Company"));
const User_1 = __importDefault(require("./User"));
const UserStory_1 = __importDefault(require("./UserStory"));
const ParticipateInvite_1 = __importDefault(require("./ParticipateInvite"));
class Project extends objection_1.Model {
    static get relationMappings() {
        return {
            company: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: Company_1.default,
                join: {
                    from: 'projects.companyId',
                    to: 'companies.id'
                }
            },
            owner: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: User_1.default,
                join: {
                    from: 'projects.ownerId',
                    to: 'users.id'
                }
            },
            participants: {
                relation: objection_1.Model.ManyToManyRelation,
                modelClass: User_1.default,
                join: {
                    from: 'projects.id',
                    through: {
                        from: 'user_projects.projectId',
                        to: 'user_projects.userId'
                    },
                    to: 'users.id'
                }
            },
            userStories: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: UserStory_1.default,
                join: {
                    from: 'projects.id',
                    to: 'user_stories.projectId'
                }
            },
            invites: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: ParticipateInvite_1.default,
                join: {
                    from: 'projects.id',
                    to: 'participate_invites.projectId'
                }
            }
        };
    }
}
exports.default = Project;
Project.tableName = 'projects';
