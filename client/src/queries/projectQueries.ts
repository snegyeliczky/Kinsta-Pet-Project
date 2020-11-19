import { gql } from '@apollo/client';

const getProjectParticipants = gql`
    query($id:ID!){
        project(id:$id){
            participants{
                id,
                firstName,
                lastName,
                email
            }
        }
    }
`;

export {getProjectParticipants}