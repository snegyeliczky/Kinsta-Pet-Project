import {gql} from "@apollo/client";

const subscribeNewTask = gql`
    subscription{
        tasksForUserStory{
            id,
            title,
            description,
            owner{
                id,
                firstName
            },
            time,
            ready,
            userStory{
                id
            }
        }
    }
`;

const newTaskSubscription = gql`
    subscription{
        newTask{
            id,
            title,
            description,
            owner{
                id,
                firstName
            },
            time,
            ready,
            userStory{
                id
            }
        }
    }
`;

const newParticipationInviteSubscription = gql`
    subscription ($receiverId:Int){
        newParticipantInvite(receiverId:$receiverId){
            id,
            sander{
                id,
                firstName
            }
            project{
                id,
                name,
                company{
                    id,
                    name
                }
            }

        }
    }
`

export {subscribeNewTask,newTaskSubscription,newParticipationInviteSubscription}