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
                    id,
                    owner{
                        id,
                        firstName
                    },
                    estimation}
            }
        }
    }
`;

const addNewProject =  gql`
    mutation ($userId:Int,
        $companyId:Int!,
        $projectName:String){
            addNewProject(
                userId:$userId,
                companyId:$companyId,
                projectName:$projectName
            ){
                id,
                name
            }
    }
`;

const getProject = gql`
    query($id:ID!){
        project(id:$id){
            id,
            name
        }
    }

`

export {getProjectParticipants,getUserStories,addNewProject,getProject}