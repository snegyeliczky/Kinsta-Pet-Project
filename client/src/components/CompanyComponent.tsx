import React, {useState} from 'react';
import {Company} from "../interfaces/Company";
import ProjectService from "../localServices/ProjectService";
import {useHistory} from "react-router-dom";
import NewProjectModal from "./Modals/NewProjectModal";
import {CompanyPageProject} from "../assets/styledComponents/styledComponents";


interface Props {
    company: Company
}


const CompanyComponent: React.FC<Props> = ({company}) => {

    const history = useHistory();
    const [projects, setProjects] = useState(ProjectService.getProjectForCompany(company.id));


    function toProjectPage(event: React.MouseEvent<HTMLDivElement>, projectId: number) {
        event.preventDefault();
        history.push("/app/project/" + projectId)
    }

    function getProjects() {
        return (
            projects.map(project => {
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
            <NewProjectModal companyId={company.id}  setProjects={setProjects}/>
        </div>


    );
};

export default CompanyComponent;