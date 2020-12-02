"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const User_1 = __importDefault(require("./User"));
const Project_1 = __importDefault(require("./Project"));
class ParticipateInvite extends objection_1.Model {
    static get relationMappings() {
        return {
            sander: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: User_1.default,
                join: {
                    from: 'participate_invites.sanderId',
                    to: 'users.id'
                }
            },
            receiver: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: User_1.default,
                join: {
                    from: 'participate_invites.receiverId',
                    to: 'users.id'
                }
            },
            project: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: Project_1.default,
                join: {
                    from: 'participate_invites.projectId',
                    to: 'projects.id'
                }
            }
        };
    }
}
exports.default = ParticipateInvite;
ParticipateInvite.tableName = 'participate_invites';
