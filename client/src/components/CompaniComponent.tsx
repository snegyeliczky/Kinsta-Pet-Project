import React, {useState} from 'react';
import {Company} from "../interfaces/Company";
import ProjectService from "../services/ProjectService";
import {useHistory} from "react-router-dom";
import NewProjectModal from "./Modals/NewProjectModal";


interface Props {
    company: Company
}


const CompaniComponent: React.FC<Props> = ({company}) => {

    const history = useHistory();
    const [projects, setProjects] = useState(ProjectService.getProjectForCompany(company.id));


    function toProjectPage(event: React.MouseEvent<HTMLDivElement>, projectId: number) {
        event.preventDefault();
        history.push("/project/" + projectId)
    }

    function getProjects() {
        return (
            projects.map(project => {
                    return (
                        <div key={project.id} className={"companyPage-project"} onClick={event => {
                            toProjectPage(event, project.id)
                        }}>
                            <h3>{project.name}</h3>

                        </div>
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

export default CompaniComponent;