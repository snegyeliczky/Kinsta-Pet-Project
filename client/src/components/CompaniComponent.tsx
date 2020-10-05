import React, {useState} from 'react';
import {Company} from "../interfaces/Company";
import ProjectService from "../services/ProjectService";
import {useHistory} from "react-router-dom";
import NewProjectModal from "./Modals/NewProjectModal";
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {CSSTransition} from "react-transition-group";


interface Props {
    company: Company
}


const CompaniComponent: React.FC<Props> = ({company}) => {

    const history = useHistory();
    const [displayProject, setDisplayProject] = useState(false);
    const [projects,setProjects] = useState(ProjectService.getProjectForCompany(company.id));


    function toProjectPage(event: React.MouseEvent<HTMLDivElement>, projectId: number) {
        event.preventDefault();
        history.push("/project/" + projectId)
    }

    function getProjects() {

        if (displayProject) {
            return(
             projects.map(project => {
                    return (

                            <div key={project.id} className={"companyPage-project"} onClick={event => {
                                toProjectPage(event, project.id)
                            }}>
                                <h3>{project.name}</h3>

                            </div>

                    )
                }
            ))
        } else return null;


    }

    return (

            <div className={"company-details"} onClick={event => setDisplayProject(!displayProject)}>
                <div className={"company-name"}>
                    <h2>{company.name}</h2>
                    <NewProjectModal companyId={company.id} setDisplay={setDisplayProject} setProjects={setProjects}/>
                </div>
                <CSSTransition
                in={displayProject}
                timeout={600}
                classNames="display"
                unmountOnExit
            >
                <div className={"projects"}>
                    {getProjects()}
                </div>
            </CSSTransition>
        </div>



    );
};

export default CompaniComponent;