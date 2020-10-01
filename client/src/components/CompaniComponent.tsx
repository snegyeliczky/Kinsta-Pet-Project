import React, {useState} from 'react';
import {Company} from "../interfaces/Company";
import ProjectService from "../services/ProjectService";
import {useHistory} from "react-router-dom";
import NewProjectModal from "./Modals/NewProjectModal";

interface Props {
    company:Company
}



const CompaniComponent:React.FC<Props> = ({company}) => {

    const history= useHistory();

    const[displayProject,setDisplayProject]= useState(false);

    function toProjectPage(event: React.MouseEvent<HTMLDivElement>,projectId:number) {
        event.preventDefault();
        history.push("/project/"+projectId)
    }

    function getProjects(){

        if (displayProject){
           return ProjectService.getProjectForCompany(company.id).map(project =>{
               return <div key={project.id} className={"companyPage-project"} onClick={event => {toProjectPage(event,project.id)}}>
                   <h3>{project.name}</h3>
               </div>
               }
           )
        }
        else return null;


    }

    return (
        <div className={"company-details"} onClick={event => setDisplayProject(!displayProject)}>
            <div className={"company-name"} >
                <h2>{company.name}</h2>
            </div>
            {getProjects()}
            <NewProjectModal companyId={company.id}/>
        </div>
    );
};

export default CompaniComponent;