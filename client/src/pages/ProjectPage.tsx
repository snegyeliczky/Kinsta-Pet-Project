import React from 'react';
import {useParams} from "react-router";
import ProjectService from "../services/ProjectService";

const ProjectPage = () => {

    const {id} = useParams();


    const getProjectData =()=>{
        let project = ProjectService.getProject(parseInt(id));
        if (project)
        return(
            <div>
                <h2>{project.name}</h2>
                <h3>projectID: {project.id}</h3>
            </div>
        );
        else return(
            <h2>No project found wit this id </h2>
        )
    };



    return (
        <div>
            {getProjectData()}
        </div>
    );
};

export default ProjectPage;