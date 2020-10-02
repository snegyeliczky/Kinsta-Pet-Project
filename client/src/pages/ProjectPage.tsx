import React from 'react';
import {useParams} from "react-router";
import ProjectService from "../services/ProjectService";
import "../assets/ProjectStyle.css"

const ProjectPage = () => {

    const {id} = useParams();


    const getProjectData =()=>{
        let project = ProjectService.getProject(parseInt(id));
        if (project)
        return(
            <div className={"project-title-container"}>
                <h2>{project.name}</h2>
                <h3>projectID: {project.id}</h3>
            </div>
        );
        else return(
            <h2>No project found wit this id </h2>
        )
    };



    return (
        <div className={"project-container"}>
            {getProjectData()}
        </div>
    );
};

export default ProjectPage;