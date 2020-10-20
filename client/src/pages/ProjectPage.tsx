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
import {UserModel} from "../interfaces/UserModel";
import UserService from "../services/UserService";

const ProjectPage = () => {


    const {id} = useParams();
    const [userStories, setUserStories] = useState(UserStoryService.getUserStoresByProjectId(parseInt(id)));
    const [sortDir, setSortDir] = useState(true);
    const UserList: { [key: string]: UserModel } = {};


    const sortByUserBusinessValueStory = () => {
        let userStoryModels = userStories.sort((a, b) => {
            if (sortDir) return (a.businessValue > b.businessValue) ? -1 : 1;
            return (a.businessValue > b.businessValue) ? 1 : -1
        });
        setSortDir(!sortDir);
        setUserStories([...userStoryModels])
    };


    function loadParticipantUsersById() {
        let project = ProjectService.getProject(parseInt(id));
        let participantList: UserModel[] = [];
        project.participants.forEach(id => {
            participantList.push(UserService.getUserById(id))
        });
        return participantList
    }


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

    const removeUSerStoryById = (storyId: number) => {
        let userStories = UserStoryService.removeUserStory(storyId);
        setUserStories(userStories);
    };

    const getUser = (userId: string): UserModel | undefined => {
        return userId ? UserList[userId] = (UserList[userId] || UserService.getUserById(userId))
            : undefined;
    };

    const getUserStores = () => {
        return (<Collapse>{userStories.map(userStory => {
            return (
                <CollapsePanel key={userStory.id}
                               header={<UserStory UserStory={userStory} removeUserStory={removeUSerStoryById}
                                                  getUser={getUser} participants={loadParticipantUsersById()}/>}>
                    <TaskTable userStory={userStory} getUser={getUser}/>
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
                <NewUserStoryModal projectId={parseInt(id)} setTasks={setUserStories} participants={loadParticipantUsersById()}/>
                <UserStoryStyleComponent id={"userStory-names"} className={"userStory-component"}>
                    <div className={"userStory-id UserStory-part"}>Story ID</div>
                    <div className={"userStory-userStory UserStory-part userStory-title"}>User Story</div>
                    <div className={"userStory-businessValue-title UserStory-part"} onClick={
                        sortByUserBusinessValueStory
                    }>Business value
                    </div>
                    <div className={"userStory-ownerId UserStory-part"}>Owner</div>
                    <div className={"userStory-estimation UserStory-part"}>Estimation Avg. (Story Point)</div>
                </UserStoryStyleComponent>
                {getUserStores()}
            </div>
        </div>
    );
};

export default ProjectPage;