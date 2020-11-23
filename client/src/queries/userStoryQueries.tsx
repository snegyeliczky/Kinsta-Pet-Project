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

export {editUserStoryQuery,updateUserStoryUser}