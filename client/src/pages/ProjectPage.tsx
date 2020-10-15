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

    const removeUSerStoryById =(storyId:number) =>{
        let userStories = UserStoryService.removeUserStory(storyId);
        setUserStories(userStories);
    };


    const getUserStores = () => {
        return (<Collapse>{userStories.map(userStory => {
            return (
                <CollapsePanel key={userStory.id} header={ <UserStory UserStory={userStory} removeUserStory={removeUSerStoryById}/>}>
                    <TaskTable userStory={userStory}/>
                </CollapsePanel>
            )
        })}
        </Collapse>)
    };

    const [sortDir,setSortDir] = useState(true);

    const sortByUserBusinessValueStory = () =>{
        let userStoryModels = userStories.sort((a, b)=>{
            if(sortDir)return (a.businessValue>b.businessValue)? -1:1;
            return (a.businessValue>b.businessValue)? 1:-1
        });
        setSortDir(!sortDir);
        setUserStories([...userStoryModels])
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
                    <div className={"userStory-userStory UserStory-part userStory-title"}>User Story</div>
                    <div className={"userStory-businessValue-title UserStory-part"} onClick={
                        sortByUserBusinessValueStory
                    }>Business value</div>
                    <div className={"userStory-ownerId UserStory-part"}>Owner id</div>
                    <div className={"userStory-estimation UserStory-part"}>Estimation Avg. (Story Point)</div>
                </UserStoryStyleComponent>
                {getUserStores()}
            </div>
        </div>
    );
};

export default ProjectPage;