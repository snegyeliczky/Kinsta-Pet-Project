import React, {useState} from 'react';
import {useParams} from "react-router";
import ProjectService from "../services/ProjectService";
import "../assets/ProjectStyle.css"
import TaskService from "../services/TaskService";
import TaskComponent from "../components/TaskComponent";
import NewTaskModal from "../components/Modals/NewTaskModal";


const ProjectPage = () => {

    const {id} = useParams();
    const[tasks,setTasks] = useState(TaskService.getTasksByProjectId(parseInt(id)));

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

    const getTasks = () =>{
       return  tasks.map(task=>{
            return(
                <TaskComponent key={task.id} task={task}/>
            )
        })
    };



    return (
        <div>
        <div className={"project-container"}>
            {getProjectData()}
        </div>

            <div className={"task-container"}>
                <NewTaskModal projectId={parseInt(id)} setTasks={setTasks}/>
                <div id={"task-names"} className={"task-component"}>
                    <div className={"task-id task-part"}>Task ID</div>
                    <div className={"task-userStory task-part"}>User Story</div>
                    <div className={"task-businessValue task-part"}>Business value</div>
                    <div className={"task-ownerId task-part"}>Owner id</div>
                    <div className={"task-estimation task-part"}>Estimation time</div>
                </div>
                {getTasks()}
            </div>
       </div>
    );
};

export default ProjectPage;