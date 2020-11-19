import { gql } from '@apollo/client';

const getTaskForUserStory = gql`
    query($id:ID!){
        userStory(id:$id){tasks{id,title,description,owner{id,firstName},time,ready,userStory{id}}}
    }
`;

const updateTaskStatus = gql`
    mutation($taskId:Int!,$taskStatus:Boolean!){
        updateTaskStatus(taskId:$taskId,taskStatus:$taskStatus){
            id,
            userStory,
            status
        }
    }
`;

const mutateTaskQuery = gql`
    mutation ($taskId:Int,$title:String,$description:String,$time:String){
        updateTask(taskId:$taskId,title:$title,description:$description,time:$time){
            id,
            title,
            description,
            ready,
            time,
            userStory{
                id
            },
            owner{
                id
            }
        }
    }
`;

const mutateTaskOwner = gql`
    mutation ($userId:Int,$taskId:Int){
        addOwnerToTask(userId:$userId,taskId:$taskId)
    }
    
`;

export {getTaskForUserStory, updateTaskStatus,mutateTaskQuery,mutateTaskOwner}