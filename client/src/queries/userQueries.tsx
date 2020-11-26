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

export {getUserById,getUsersCompanies};