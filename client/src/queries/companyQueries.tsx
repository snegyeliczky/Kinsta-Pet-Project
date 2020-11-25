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

export {getProjectsForCompany,getProjectsForCompanyByUser}
