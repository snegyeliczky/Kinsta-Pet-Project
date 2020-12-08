import {withFilter} from 'graphql-subscriptions';

export const subscriptions = {
        tasksForUserStory: {
            subscribe: (parent: any, args: any, Context: { pubSub: any }) => {
                return Context.pubSub.asyncIterator("NEW_TASK_FOR_USER_STORY")
            }
        },

        newTask: {
            subscribe: (parent: any, args: any, Context: { pubSub: any }) => {
                return Context.pubSub.asyncIterator("NEW_TASK")
            }
        },

        newParticipantInvite: {
            subscribe: withFilter(
                (parent: any, args: any, Context: { pubSub: any }): AsyncIterator<any> => {
                    return Context.pubSub.asyncIterator("NEW_PARTICIPANT_INVITE")
                },
                (payload: any, variables: any): boolean | Promise<boolean> => {
                    return payload.newParticipantInvite.receiverId === variables.receiverId
                }),
        }

    }
;