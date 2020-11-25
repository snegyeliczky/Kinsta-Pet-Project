import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router";
import "../assets/ProjectStyle.css"
import NewUserStoryModal from "../components/Modals/NewUserStoryModal";
import {Collapse} from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import {ProjectTitleContainer, UserStoryStyleComponent} from "../assets/styledComponents/styledComponents";
import UserStory from "../components/UserStory";
import TaskTable from "../components/TaskTable";
import ProjectContext from "../context/ProjectContext";
import {useMutation, useQuery} from "@apollo/client";
import {deleteProjectMutation, getProject, getUserStories} from "../queries/projectQueries";
import {UserStoryModel} from "../interfaces/UserStoryModel";
import {deleteUserStoryMutation} from "../queries/userStoryQueries";
import AlertModal from "../components/Modals/AlertModal";
import {DeleteOutlined} from '@ant-design/icons';
import {getProjectsForCompanyByUser} from "../queries/companyQueries";
import {ApplicationContext} from "../context/ApplicationContext";

const ProjectPage = () => {

    const projectContext = useContext(ProjectContext);
    const appContext = useContext(ApplicationContext);
    const {id} = useParams();
    const [sortDir, setSortDir] = useState(true);
    const {loading: load_userStory, error: error_userStory, data: userStory_data, refetch: refetch_userStory} =
        useQuery(getUserStories,
            {
                variables: {
                    id: parseInt(id)
                }
            });
    const {loading: load_project, error: error_project, data: project_data} =
        useQuery(getProject, {
            variables: {
                id: id
            }
        });
    const [deleteUserStory] = useMutation(deleteUserStoryMutation);
    const [deleteProject] = useMutation(deleteProjectMutation);
    const history = useHistory();

    useEffect(() => {
        projectContext.loadParticipantUsersById(id);
    }, [id]);

    const sortByBusinessValue = () => {
        setSortDir(!sortDir)
    };

    const deleteAndHome = async () => {
        await deleteProject({
            variables: {
                projectId: parseInt(id)
            },
            refetchQueries: [{
                query: getProjectsForCompanyByUser,
                variables: {
                    userId: appContext.getUserIdAsNumber(),
                    companyId: project_data.project.company.id
                }
            }]
        });
        history.push("/app");
    };

    const sortUserStories = (storyList: UserStoryModel[]) => {
        return storyList.sort((a, b) => {
            if (sortDir) return (a.businessValue > b.businessValue) ? -1 : 1;
            return (a.businessValue > b.businessValue) ? 1 : -1
        });
    };

    const getProjectData = () => {
        if (load_project)
            return (
                <ProjectTitleContainer>
                    <h2>Loading...</h2>
                </ProjectTitleContainer>
            );
        if (error_project) return <div>Error..</div>;

        console.log(project_data.project)
        return (
            <ProjectTitleContainer className={"project-title-container"}>
                <h2>{project_data.project.name}</h2>
                <h3>projectID: {project_data.project.id}</h3>
                {
                    appContext.isUserIsOwner(project_data.project.owner.id) ?
                        <AlertModal text={"shure to delete?"} buttonText={<DeleteOutlined/>}
                                    OkFunction={deleteAndHome}/>
                                    : ""}
            </ProjectTitleContainer>
        );

    };


    const removeUSerStoryById = async (storyId: number) => {
        await deleteUserStory({
            variables: {
                userStoryId: storyId
            }
        });
        await refetch_userStory();
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
        if (load_userStory) return <div>Loading...</div>;
        if (error_userStory) return <div>Error van</div>;
        let storyList = userStory_data.project.userStories;
        let sortedStoryList = sortUserStories([...storyList]);
        return renderUserStories(sortedStoryList);
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