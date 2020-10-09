import React, {useState} from 'react';
import {useParams} from "react-router";
import ProjectService from "../services/ProjectService";
import "../assets/ProjectStyle.css"
import NewUserStoryModal from "../components/Modals/NewUserStoryModal";
import {Collapse} from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import {ProjectTitleContainer, UserStoryStyleComponent} from "../assets/styledComponents/styledComponents";
import UserStory from "../components/UserStory";
import UserStoryService from "../services/UserStoryService";
import TaskService from "../services/TaskService";
import TaskTable from "../components/TaskTable";

const ProjectPage = () => {


    const {id} = useParams();
    const [userStories, setUserStories] = useState(UserStoryService.getUserStoresByProjectId(parseInt(id)));


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


    const getUserStores = () => {
        return (<Collapse>{userStories.map(userStory => {
            return (
                <CollapsePanel key={userStory.id} header={ <UserStory userStory={userStory}/>}>
                    {console.log(TaskService.getTasksByUserStory(userStory.id))}
                    <TaskTable userStory={userStory}/>
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

            <div className={"userStory-container"}>
                <NewUserStoryModal projectId={parseInt(id)} setTasks={setUserStories}/>
                <UserStoryStyleComponent id={"userStory-names"} className={"userStory-component"}>
                    <div className={"userStory-id UserStory-part"}>Story ID</div>
                    <div className={"userStory-userStory UserStory-part"}>User Story</div>
                    <div className={"userStory-businessValue UserStory-part"}>Business value</div>
                    <div className={"userStory-ownerId UserStory-part"}>Owner id</div>
                    <div className={"userStory-estimation UserStory-part"}>Estimation time</div>
                </UserStoryStyleComponent>
                {getUserStores()}
            </div>
        </div>
    );
};

export default ProjectPage;