import React, {useState} from 'react';
import {useParams} from "react-router";
import ProjectService from "../services/ProjectService";
import "../assets/ProjectStyle.css"
import TaskService from "../services/TaskService";
import NewTaskModal from "../components/Modals/NewTaskModal";
import {Collapse} from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import TaskComponent from "../components/TaskComponent";
import {ProjectTitleContainer, TaskStyleComponent} from "../assets/styledComponents/styledComponents";


const ProjectPage = () => {


    const {id} = useParams();
    const [tasks, setTasks] = useState(TaskService.getTasksByProjectId(parseInt(id)));


    const getProjectData = () => {
        let project = ProjectService.getProject(parseInt(id));
        if (project)
            return (
                <ProjectTitleContainer className={"project-title-container"}>
                    <h2>{project.name}</h2>
                    <h3>projectID: {project.id}</h3>
                </ProjectTitleContainer>
            );
        else return (
            <h2>No project found wit this id </h2>
        )
    };


    const getTasks = () => {
        return (<Collapse>{tasks.map(task => {
            return (
                <CollapsePanel key={task.id} header={ <TaskComponent task={task}/>}>
                    <div>Issue</div>
                    <div>Issue</div>
                    <div>Issue</div>
                </CollapsePanel>
            )
        })}
        </Collapse>)
    };


    return (
        <div>
            <div className={"project-container"}>
                {getProjectData()}
            </div>

            <div className={"task-container"}>
                <NewTaskModal projectId={parseInt(id)} setTasks={setTasks}/>
                <TaskStyleComponent id={"task-names"} className={"task-component"}>
                    <div className={"task-id task-part"}>Task ID</div>
                    <div className={"task-userStory task-part"}>User Story</div>
                    <div className={"task-businessValue task-part"}>Business value</div>
                    <div className={"task-ownerId task-part"}>Owner id</div>
                    <div className={"task-estimation task-part"}>Estimation time</div>
                </TaskStyleComponent>
                {getTasks()}
            </div>
        </div>
    );
};

export default ProjectPage;