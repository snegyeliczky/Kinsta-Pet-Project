import {gql} from "@apollo/client";

const subscribeUserStoryTasks = gql`
    subscription($userStoryId:Int){
        tasksForUserStory(userStoryId:$userStoryId){
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
    subscription($userStoryId:Int){
        newTask(userStoryId:$userStoryId){
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
`;

const newParticipantJoined = gql`
    subscription($projectId:Int){
        joinParticipation(projectId:$projectId){
            id,
            firstName,
            lastName,
            email
        }
    }
`;

const newUserStory = gql`
    subscription ($projectId:Int){
        newUserStory(projectId:$projectId){
            id,
            userStory,
            project{id},
            status,
            businessValue,
            owner{
                id,
                firstName
            },
            estimatedUsers{
                id,
                owner{
                    id,
                    firstName
                },
                estimation}
        }
    }
`

const removeUserStory = gql`
    subscription ($projectId:Int){
        removeUserStory(projectId:$projectId)
    }
`

const removeTask = gql`
    subscription ($userStoryId:Int){
        removeTask(userStoryId:$userStoryId)
    }
`

export {
    subscribeUserStoryTasks, newTaskSubscription, newParticipationInviteSubscription,
    newParticipantJoined, newUserStory, removeUserStory, removeTask
}