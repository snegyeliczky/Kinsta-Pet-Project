import React, {useContext, useState} from 'react';
import {Company} from "../interfaces/Company";
import ProjectService from "../localServices/ProjectService";
import {useHistory} from "react-router-dom";
import NewProjectModal from "./Modals/NewProjectModal";
import {CompanyPageProject} from "../assets/styledComponents/styledComponents";
import {useQuery} from "@apollo/client";
import { getProjectsForCompanyByUser} from "../queries/companyQueries";
import {Project} from "../interfaces/Project";
import {ApplicationContext} from "../context/ApplicationContext";


interface Props {
    company: Company
}


const CompanyComponent: React.FC<Props> = ({company}) => {


    const history = useHistory();
    const appContext = useContext(ApplicationContext);
    const{error,loading,data} = useQuery(getProjectsForCompanyByUser, {variables:{userId:appContext.getUserIdAsNumber(),companyId:company.id}});


    function toProjectPage(event: React.MouseEvent<HTMLDivElement>, projectId: number) {
        event.preventDefault();
        history.push("/app/project/" + projectId)
    }

    if (error) return <div>Error!!! {error}</div>;
    if (loading) return <div>Loading...</div>;

    function getProjects() {
        return (
            data.projectsForCompanyByUser.map((project:Project) => {
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


    return (
        <div className={"projects"}>
            {getProjects()}
            <NewProjectModal companyId={company.id}/>
        </div>


    );
};

export default CompanyComponent;