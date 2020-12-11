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

export {subscribeUserStoryTasks,newTaskSubscription,newParticipationInviteSubscription,newParticipantJoined}