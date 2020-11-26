import React, {useContext} from 'react';
import {Company} from "../interfaces/Company";
import {useHistory} from "react-router-dom";
import NewProjectModal from "./Modals/NewProjectModal";
import {CenterDiv, CompanyPageProject} from "../assets/styledComponents/styledComponents";
import {useMutation, useQuery} from "@apollo/client";
import {deleteCompany, getProjectsForCompanyByUser} from "../queries/companyQueries";
import {Project} from "../interfaces/Project";
import {ApplicationContext} from "../context/ApplicationContext";
import AlertModal from "./Modals/AlertModal";
import {getUsersCompanies} from "../queries/userQueries";


interface Props {
    company: Company
}


const CompanyComponent: React.FC<Props> = ({company}) => {


    const history = useHistory();
    const appContext = useContext(ApplicationContext);
    const {error, loading, data} = useQuery(getProjectsForCompanyByUser, {
        variables: {
            userId: appContext.getUserIdAsNumber(),
            companyId: company.id
        }
    });
    const [removeCompany] = useMutation(deleteCompany);


    function toProjectPage(event: React.MouseEvent<HTMLDivElement>, projectId: number) {
        event.preventDefault();
        history.push("/app/project/" + projectId)
    }

    if (error) return <div>Error!!! {error}</div>;
    if (loading) return <div>Loading...</div>;

    function getProjects() {
        return (
            data.projectsForCompanyByUser.map((project: Project) => {
                    return (
                        <CompanyPageProject key={project.id} onClick={event => {
                            toProjectPage(event, project.id)
                        }}>
                            <div>{project.name}</div>
                        </CompanyPageProject>
                    )
                }
            )
        )
    }

    const deleteCompanyAndRefetch = async () => {
        await removeCompany({
            variables: {
                companyId: company.id
            },
            refetchQueries: [{query:getUsersCompanies,variables:{id:appContext.getUserIdAsNumber()}}]
        });
    };


    return (
        <div className={"projects"}>
            {getProjects()}
            <NewProjectModal companyId={company.id}/>
            <CenterDiv>
                <AlertModal text={"Delete ?"} buttonText={"Delete Company"} OkFunction={deleteCompanyAndRefetch}/>
            </CenterDiv>
        </div>


    );
};

export default CompanyComponent;