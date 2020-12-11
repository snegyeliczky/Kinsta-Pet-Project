import React, {useContext, useState} from 'react';
import {useHistory, useParams} from "react-router";
import "../assets/ProjectStyle.css"
import NewUserStoryModal from "../components/Modals/NewUserStoryModal";
import {Collapse} from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import {CenterDiv, ProjectTitleContainer, UserStoryStyleComponent} from "../assets/styledComponents/styledComponents";
import UserStory from "../components/UserStory";
import TaskTable from "../components/TaskTable";
import {useMutation, useQuery} from "@apollo/client";
import {deleteProjectMutation, getProject, getUserStories} from "../queries/projectQueries";
import {UserStoryModel} from "../Types/UserStoryModel";
import {deleteUserStoryMutation} from "../queries/userStoryQueries";
import AlertModal from "../components/Modals/AlertModal";
import {getProjectsForCompanyByUser} from "../queries/companyQueries";
import {ApplicationContext} from "../context/ApplicationContext";
import InviteModal from "../components/Modals/InviteColaboratorModal";
import {newUserStory} from "../queries/subscriptions";
import {TaskModel} from "../Types/TaskModel";

const ProjectPage = () => {

    const appContext = useContext(ApplicationContext);
    const {id} = useParams();
    const [sortDir, setSortDir] = useState(true);
    const {loading: load_userStory, error: error_userStory, data: userStory_data, refetch: refetch_userStory, subscribeToMore} =
        useQuery(getUserStories,
            {
                variables: {
                    id
                },
                fetchPolicy: "network-only",
                onCompleted: () => {
                    subscribeToNewUserStory()
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

    const subscribeToNewUserStory = () => subscribeToMore({
        document: newUserStory,
        variables: {projectId: parseInt(id)},
        updateQuery: (prev, {subscriptionData}) => {
            if (!subscriptionData.data) return prev;

            let newList = [...userStory_data.project.userStories];
            let some = newList.some((us: UserStoryModel) => {
                return us.id != subscriptionData.data.newUserStory.id
            });
            if(some) newList.push(subscriptionData.data.newUserStory);
            return {
                project: {
                    userStories: newList
                }
            }
        }
    });


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
        if (error_project) return <div>Error..</div>;
        return (
            <ProjectTitleContainer className={"project-title-container"}>
                <h2>{project_data.project.name}</h2>
                <h3>projectID: {project_data.project.id}</h3>
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
        if (error_userStory) return <div>Error {error_userStory?.message}</div>;
        let storyList = userStory_data.project.userStories;
        let sortedStoryList = sortUserStories([...storyList]);
        return renderUserStories(sortedStoryList);
    };

    const loadDeleteProject = () => {
        if (error_project) return <div>Error {error_project?.message}</div>;
        return (
            appContext.isUserIsOwner(project_data.project.owner.id) ?
                <AlertModal text={"Sure to delete?"} buttonText={`Delete project`}
                            OkFunction={deleteAndHome}/> :
                ""
        );

    };


    if (load_project) return (<div>Load project...</div>);
    if (load_userStory) return (<div>Load user Stories...</div>);
    return (
        <div>
            <div className={"project-container"}>
                <CenterDiv>
                    <InviteModal projectId={parseInt(id)}/>
                    {loadDeleteProject()}
                </CenterDiv>
                {getProjectData()}
            </div>

            <div className={"userStory-container"}>
                <NewUserStoryModal projectId={parseInt(id)}/>
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