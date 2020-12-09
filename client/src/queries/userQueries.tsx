import {gql} from "@apollo/client";

const getUserById = gql`
    query($id:ID!){
        user(id:$id){
            id,
            firstName,
            lastName,
            email,
        }
    }
`;

const getUsersCompanies = gql`
    query($id:ID!){
        user(id:$id){
            companies{
                id,
                name,
                ownerUser{
                    id,
                    firstName,
                    lastName,
                    email
                },
                users{
                    id,
                    firstName,
                    lastName,
                    email
                }
            }
        }
    }
`;

const loginUser = gql`
    query(
        $email:String,
        $password:String){
        login(
            email:$email,
            password:$password
        ){
            id,
            firstName,
            lastName,
            email
        }
    }
`

const registerUser = gql`
    mutation(
        $FirstName:String!,
        $LastName:String!,
        $Email:String!,
        $Password:String!
    ){
        addNewUser(
            FirstName:$FirstName,
            LastName:$LastName,
            Email:$Email,
            Password:$Password
        ){
            id,
            firstName,
            lastName,
            email
        }
    }
`

const getUsersByEmail = gql`
    query(
        $email:String
    ){
        getUserByEmail(
            email:$email
        ){
            id,
            firstName,
            lastName,
            email
        }
    }
`;

const inviteUserToCollaborate = gql`
    mutation (
        $senderId:Int,
        $receiverId:Int,
        $projectId:Int){
        sendParticipateInviteToUser(
            senderId:$senderId,
            receiverId:$receiverId,
            projectId:$projectId
        )
    }
`;

const getUserInvites = gql`
    query($id:ID!){user(id:$id){
        invites{
            id,
            sander{
                id,
                firstName
            }
            project{
                id,
                name
                company{
                    id,
                    name
                }
            }
        }
    }
    }
`;

const acceptParticipationInvite = gql`
    mutation ($invitationId:Int){
        acceptParticipationInvite(
            invitationId:$invitationId
        )
    }
`

export {
    getUserById, getUsersCompanies, loginUser, registerUser,
    getUsersByEmail,inviteUserToCollaborate,getUserInvites,
    acceptParticipationInvite};