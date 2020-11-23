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

export {getUserById};