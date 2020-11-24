import {gql} from "@apollo/client";

const editUserStoryQuery = gql`
    mutation(
        $userStoryId:Int,
        $businessValue:Int,
        $userStory:String
    ){
        updateUserStory(
            userStoryId:$userStoryId,
            businessValue:$businessValue,
            userStory:$userStory
        ){      id,
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
                estimation}}
    }`;

const updateUserStoryUser = gql`
    mutation($userStoryId:Int,$userId:Int){
        addOwnerToUserStory(userStoryId:$userStoryId, userId:$userId){
            id,
            firstName,
            lastName,
            email,
        }
    }
`

const estimateUserStory = gql`
    mutation($userId:Int,$userStoryId:Int,$estimation:Int){
        estimateUserStory(userId:$userId,
            userStoryId:$userStoryId,
            estimation:$estimation)
    }
`

const estimationsForUserStory = gql`
    query($id:ID!){
        userStory(id:$id){
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

const addNewUserStoryMutation = gql`
    mutation(
        $userId:Int,
        $projectId:Int!,
        $userStory:String,
        $businessValue:Int
    ){
        addNewUserStory(
            userId:$userId,
            projectId:$projectId,
            userStory:$userStory,
            businessValue:$businessValue
        ){
            id,
            userStory
        }
    }
`

const deleteUserStoryMutation = gql`
    mutation ($userStoryId:Int){
        deleteUserStory(userStoryId:$userStoryId)
    }
`

export {
    editUserStoryQuery, updateUserStoryUser, estimateUserStory, estimationsForUserStory, addNewUserStoryMutation,
    deleteUserStoryMutation
}