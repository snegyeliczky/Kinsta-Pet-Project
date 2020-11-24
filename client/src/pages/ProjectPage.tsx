import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router";
import ProjectService from "../localServices/ProjectService";
import "../assets/ProjectStyle.css"
import NewUserStoryModal from "../components/Modals/NewUserStoryModal";
import {Collapse} from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import {ProjectTitleContainer, UserStoryStyleComponent} from "../assets/styledComponents/styledComponents";
import UserStory from "../components/UserStory";
import TaskTable from "../components/TaskTable";
import ProjectContext from "../context/ProjectContext";
import {useMutation, useQuery} from "@apollo/client";
import {getUserStories} from "../queries/projectQueries";
import {UserStoryModel} from "../interfaces/UserStoryModel";
import {deleteUserStoryMutation} from "../queries/userStoryQueries";

const ProjectPage = () => {

    const projectContext = useContext(ProjectContext);
    const {id} = useParams();
    const [sortDir, setSortDir] = useState(true);
    const {loading, error, data, refetch} = useQuery(getUserStories, {
        variables: {
            id: parseInt(id)
        }
    });

    const [deleteUserStory] = useMutation(deleteUserStoryMutation)

    useEffect(() => {
        projectContext.loadParticipantUsersById(id);
    }, [id]);

    const sortByBusinessValue = () => {
        //logic

        /*
        let userStoryModels = userStories.sort((a, b) => {
            if (sortDir) return (a.businessValue > b.businessValue) ? -1 : 1;
            return (a.businessValue > b.businessValue) ? 1 : -1
        });
        setSortDir(!sortDir);
        setUserStories([...userStoryModels])
         */
    };

    const getProjectData = () => {
        let project = ProjectService.getProject(parseInt(id));
        if (project) {
            return (
                <ProjectTitleContainer className={"project-title-container"}>
                    <h2>{project.name}</h2>
                    <h3>projectID: {project.id}</h3>
                </ProjectTitleContainer>
            );
        } else return (
            <h2>No project found wit this id </h2>
        )
    };


    const removeUSerStoryById = async (storyId: number) => {
       await deleteUserStory({variables:{
                userStoryId:storyId
            }});
        await refetch();
        /*
        let userStories = UserStoryService.removeUserStory(storyId);
        setUserStories(userStories);

         */
    };

    const renderUserStories = (storyList: UserStoryModel[]) => {
        return (<Collapse>{storyList.map((userStory: UserStoryModel) => {
            return (
                <CollapsePanel key={userStory.id}
                               header={<UserStory UserStory={userStory} removeUserStory={removeUSerStoryById}/>}>
                    <TaskTable userStory={userStory}/>
                </CollapsePanel>
            )
        })}
        </Collapse>)
    };

    const loadUserStories = () => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error van</div>;
        let storyList = data.project.userStories;
        return renderUserStories(storyList);
    };


    return (
        <div>
            <div className={"project-container"}>
                {getProjectData()}
            </div>

            <div className={"userStory-container"}>
                <NewUserStoryModal projectId={parseInt(id)} participants={projectContext.participants}/>
                <UserStoryStyleComponent id={"userStory-names"} className={"userStory-component"} hover={false}>
                    <div className={"userStory-id UserStory-part"}>Story ID</div>
                    <div className={"userStory-userStory UserStory-part userStory-title"}>User Story</div>
                    <div className={"userStory-businessValue-title UserStory-part"} onClick={
                        sortByBusinessValue
                    }>Business value
                    </div>
                    <div className={"userStory-ownerId UserStory-part"}>Owner</div>
                    <div className={"userStory-estimation UserStory-part"}>Estimation Avg. (Story Point)</div>
                </UserStoryStyleComponent>
                {loadUserStories()}
            </div>
        </div>
    );
};

export default ProjectPage;