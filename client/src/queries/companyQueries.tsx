import {gql} from "@apollo/client";

const getProjectsForCompany = gql`
    query($id:ID!){
        company(id:$id){
            projects{
                id,
                name,
                owner{
                    id,
                    firstName,
                    lastName,
                }
                company{
                    id,
                    name
                },
                participants{
                    id,
                    firstName,
                    lastName
                }

            }
        }
    }`;

const getProjectsForCompanyByUser = gql`
    query($userId:Int,$companyId:Int){
        projectsForCompanyByUser(
            userId:$userId,
            companyId:$companyId
        ){
            id,
            name,
            owner{
                id,
                firstName,
                lastName,
            }
            company{
                id,
                name
            },
            participants{
                id,
                firstName,
                lastName
            }

        }
    }`;

const createNewCompany = gql`
    mutation ($userId:Int!,$CompanyName:String!){
        addNewCompany(userId:$userId,CompanyName:$CompanyName){
            id,
            name
        }
    }
`;

const deleteCompany = gql`
    mutation($companyId:Int){
        deleteCompany(companyId:$companyId)
    }
`;

export {getProjectsForCompany,getProjectsForCompanyByUser,createNewCompany,deleteCompany}
