"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Company_1 = __importDefault(require("./Company"));
const objection_1 = require("objection");
const Project_1 = __importDefault(require("./Project"));
const UserStory_1 = __importDefault(require("./UserStory"));
const Task_1 = __importDefault(require("./Task"));
const UserEstimation_1 = __importDefault(require("./UserEstimation"));
const ParticipateInvite_1 = __importDefault(require("./ParticipateInvite"));
class User extends objection_1.Model {
    constructor() {
        super(...arguments);
        this.getName = () => {
            return this.firstName + " " + this.lastName;
        };
    }
    static get relationMappings() {
        return {
            companies: {
                relation: objection_1.Model.ManyToManyRelation,
                modelClass: Company_1.default,
                join: {
                    from: 'users.id',
                    // ManyToMany relation needs the `through` object to describe the join table.
                    through: {
                        from: 'users_company.userId',
                        to: 'users_company.companyId'
                    },
                    to: 'companies.id'
                }
            },
            projects: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: Project_1.default,
                join: {
                    from: 'users.id',
                    to: 'projects.ownerId'
                }
            },
            participate: {
                relation: objection_1.Model.ManyToManyRelation,
                modelClass: Project_1.default,
                join: {
                    from: 'users.id',
                    through: {
                        from: 'user_projects.userId',
                        to: 'user_projects.projectId'
                    },
                    to: 'projects.id'
                }
            },
            userStories: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: UserStory_1.default,
                join: {
                    from: 'users.id',
                    to: 'user_stories.userId'
                }
            },
            userStoryEstimations: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: UserEstimation_1.default,
                join: {
                    from: 'users.id',
                    to: 'user_estimations.userId'
                }
            },
            tasks: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: Task_1.default,
                join: {
                    from: 'users.id',
                    to: 'tasks.owner_id'
                }
            },
            sandedInvites: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: ParticipateInvite_1.default,
                join: {
                    from: 'users.id',
                    to: 'participate_invites.sanderId'
                }
            },
            receivedInvites: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: ParticipateInvite_1.default,
                join: {
                    from: 'users.id',
                    to: 'participate_invites.receiverId'
                }
            },
            ownedCompanies: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: Company_1.default,
                join: {
                    from: 'users.id',
                    to: 'companies.owner'
                }
            }
        };
    }
}
exports.default = User;
User.tableName = 'users';
User.idColumn = "id";
User.jsonSchema = {
    type: 'Object',
    required: ['firstName', 'lastName'],
    properties: {
        id: { type: 'integer' },
        firstName: { type: 'string', minLength: 1, maxLength: 255 },
        lastName: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string' },
        password: { type: 'string' }
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
;
