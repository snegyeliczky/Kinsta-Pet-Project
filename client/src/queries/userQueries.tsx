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

export {getUserById, getUsersCompanies, loginUser, registerUser};