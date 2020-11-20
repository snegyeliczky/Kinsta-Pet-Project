import {gql} from '@apollo/client';

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

const getUserStories = gql`
    query ($id:ID!){
        project(id:$id){
            userStories{
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
                    owner{
                        id,
                        firstName
                    },
                    estimation}
            }
        }
    }
`

export {getProjectParticipants,getUserStories}